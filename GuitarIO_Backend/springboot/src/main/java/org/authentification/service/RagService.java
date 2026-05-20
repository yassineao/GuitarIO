package org.authentification.service;

import org.authentification.dto.RagRequest;
import org.authentification.dto.RagResponse;
import org.authentification.entity.Lesson;
import org.authentification.entity.UserLesson;
import org.authentification.repository.LessonRepository;
import org.authentification.repository.UserLessonRepository;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class RagService {

    private static final int DEFAULT_LIMIT = 4;
    private static final int MAX_LIMIT = 8;
    private static final int MAX_CONTEXT_CHARS = 7_000;
    private static final int MAX_LESSON_CHARS = 1_400;

    private final EmbeddingService embeddingService;
    private final LessonRepository lessonRepo;
    private final UserLessonRepository userLessonRepo;
    private final ChatModel chatModel;

    public RagService(
            EmbeddingService embeddingService,
            LessonRepository lessonRepo,
            UserLessonRepository userLessonRepo,
            ChatModel chatModel
    ) {
        this.embeddingService = embeddingService;
        this.lessonRepo = lessonRepo;
        this.userLessonRepo = userLessonRepo;
        this.chatModel = chatModel;
    }

    public RagResponse askQuestion(Long userId, RagRequest request) {
        String question = normalizeQuestion(request == null ? null : request.question());
        int limit = normalizeLimit(request == null ? null : request.limit());

        String embedding = toPgVector(embeddingService.embed(question));
        List<Lesson> relevantLessons = lessonRepo.findSimilarLessons(embedding, limit);
        List<UserLesson> userLessons = userLessonRepo.findByUserId(userId);

        String answer = chatModel.call(buildPrompt(question, relevantLessons, userLessons));

        return new RagResponse(
                answer == null || answer.isBlank() ? "I could not generate an answer right now." : answer.trim(),
                relevantLessons.stream()
                        .map(this::toSource)
                        .toList()
        );
    }

    private String normalizeQuestion(String question) {
        if (question == null || question.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Question is required");
        }

        String trimmed = question.trim();
        if (trimmed.length() > 1_000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Question is too long");
        }
        return trimmed;
    }

    private int normalizeLimit(Integer limit) {
        if (limit == null) {
            return DEFAULT_LIMIT;
        }
        return Math.max(1, Math.min(limit, MAX_LIMIT));
    }

    private String buildPrompt(String question, List<Lesson> lessons, List<UserLesson> userLessons) {
        long assignedCount = userLessons.size();
        long completedCount = userLessons.stream()
                .filter(userLesson -> Boolean.TRUE.equals(userLesson.getIsCompleted()))
                .count();

        String context = buildLessonContext(lessons);

        return """
                You are GuitarIO's guitar teaching assistant.

                Rules:
                - Answer the student's question using the lesson context first.
                - If the context is missing something important, say that and then give a careful general guitar explanation.
                - Keep the answer practical, beginner-friendly, and focused on what to practice next.
                - Do not invent lesson names, progress, or facts that are not in the context.

                Student progress:
                Assigned lessons: %d
                Completed lessons: %d

                Retrieved lesson context:
                %s

                Student question:
                %s
                """.formatted(assignedCount, completedCount, context, question);
    }

    private String buildLessonContext(List<Lesson> lessons) {
        if (lessons.isEmpty()) {
            return "No matching GuitarIO lessons were found.";
        }

        StringBuilder context = new StringBuilder();
        for (int i = 0; i < lessons.size(); i++) {
            Lesson lesson = lessons.get(i);
            String block = """
                    Source %d
                    Title: %s
                    Description: %s
                    Difficulty: %s
                    Content:
                    %s

                    """.formatted(
                    i + 1,
                    sourceTitle(lesson),
                    blankToFallback(lesson.getDescription(), "No description"),
                    lesson.getDifficultyLevel(),
                    truncate(blankToFallback(lesson.getContent(), ""), MAX_LESSON_CHARS)
            );

            if (context.length() + block.length() > MAX_CONTEXT_CHARS) {
                break;
            }
            context.append(block);
        }

        return context.toString();
    }

    private RagResponse.RagSource toSource(Lesson lesson) {
        return new RagResponse.RagSource(
                lesson.getId(),
                sourceTitle(lesson),
                lesson.getChapter(),
                lesson.getNumber(),
                lesson.getDescription()
        );
    }

    private String sourceTitle(Lesson lesson) {
        String chapter = blankToFallback(lesson.getChapter(), "Lesson");
        Integer number = lesson.getNumber();
        return number == null ? chapter : chapter + " #" + number;
    }

    private String toPgVector(float[] embedding) {
        StringBuilder vector = new StringBuilder("[");
        for (int i = 0; i < embedding.length; i++) {
            if (i > 0) {
                vector.append(',');
            }
            vector.append(String.format(Locale.US, "%.8f", embedding[i]));
        }
        return vector.append(']').toString();
    }

    private String truncate(String value, int maxLength) {
        if (value.length() <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength - 3) + "...";
    }

    private String blankToFallback(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value.trim();
    }
}
