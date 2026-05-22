package org.authentification.service;

import org.authentification.entity.DifficultyLevel;
import org.authentification.entity.Lesson;
import org.authentification.entity.User;
import org.authentification.entity.UserLesson;
import org.authentification.repository.LessonRepository;
import org.authentification.repository.UserLessonRepository;
import org.authentification.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class LessonService {
    private final EmbeddingService embeddingService;
    private final LessonRepository lessonRepo;
    private final UserRepository userRepo;
    private final UserLessonRepository userLessonRepo;


    public LessonService(
            EmbeddingService embeddingService,
            LessonRepository lessonRepo,
            UserRepository userRepo,
            UserLessonRepository userLessonRepo
    ) {
        this.embeddingService = embeddingService;
        this.lessonRepo = lessonRepo;
        this.userRepo = userRepo;
        this.userLessonRepo = userLessonRepo;
    }

    public List<UserLesson> getMyLessons(Long userId) {
        return userLessonRepo.findByUserId(userId);
    }

    public Lesson createLesson(Lesson lesson) {
        lesson.setId(null);
        return lessonRepo.save(lesson);
    }

    public Lesson updateLesson(Lesson lesson) {
        return lessonRepo.save(lesson);
    }
    public void deleteLesson(Lesson lesson) {
        lessonRepo.delete(lesson);
    }

    public Lesson createLesson(String chapter, Integer number , String content , DifficultyLevel difficultyLevel, String description ) {
        String embeddingText = """
                Chapter: %s
                Lesson Number: %s
                Description: %s
                Content: %s
                """.formatted(
                chapter,
                number,
                description,
                content
        );

        // generate embedding vector
        float[] embedding = embeddingService.embed(embeddingText);
        Lesson lesson = new Lesson();
        lesson.setChapter(chapter);
        lesson.setNumber(number);
        lesson.setContent(content);
        lesson.setDifficultyLevel(difficultyLevel);
        lesson.setDescription(description);
        lesson.setEmbedding(embedding);
        return lessonRepo.save(lesson);

    }

    public UserLesson assignLessonToUser(Long userId, Long lessonId) {
        if (lessonId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "lessonId is required");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Lesson lesson = lessonRepo.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found"));

        if (userLessonRepo.findByUserIdAndLessonId(userId, lessonId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Lesson already assigned");
        }

        UserLesson userLesson = new UserLesson();
        userLesson.setUser(user);
        userLesson.setLesson(lesson);
        userLesson.setIsAvailable(true);
        userLesson.setIsCompleted(false);

        return userLessonRepo.save(userLesson);
    }

    public Map<String, String> getLessonContent(String chapter, Integer number) {
        String content = lessonRepo.findContentByChapterAndNumber(chapter, number)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found"));

        return Map.of("content", content);
    }

    public Map<String, List<Integer>> getChaptersWithNumbers() {
        List<Object[]> rows = lessonRepo.findChaptersWithNumbers();

        Map<String, List<Integer>> result = new LinkedHashMap<>();

        for (Object[] row : rows) {
            String chapter = (String) row[0];
            Integer number = (Integer) row[1];

            result.computeIfAbsent(chapter, k -> new ArrayList<>()).add(number);
        }

        return result;
    }

    public UserLesson markLessonComplete(Long userId, Long lessonId) {
        UserLesson userLesson = userLessonRepo.findByUserIdAndLessonId(userId, lessonId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Lesson not assigned to you"
                ));

        userLesson.setIsCompleted(true);
        return userLessonRepo.save(userLesson);
    }
}
