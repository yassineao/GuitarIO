package org.authentification.service;

import org.authentification.dto.RagRequest;
import org.authentification.dto.RagResponse;
import org.authentification.repository.LessonRepository;
import org.authentification.repository.LessonRepository.RagLessonView;
import org.authentification.repository.UserLessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.chat.model.ChatModel;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RagServiceTest {

    @Mock
    private EmbeddingService embeddingService;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private UserLessonRepository userLessonRepository;

    @Mock
    private ChatModel chatModel;

    private RagService ragService;

    @BeforeEach
    void setUp() {
        ragService = new RagService(embeddingService, lessonRepository, userLessonRepository, chatModel);
        when(embeddingService.embed(anyString())).thenReturn(new float[] {0.1f, 0.2f});
    }

    @Test
    void askQuestion_ShouldFallback_WhenRetrievedLessonsAreBelowSimilarityThreshold() {
        // Arrange
        when(lessonRepository.findSimilarLessonsForRag("[0.10000000,0.20000000]", 4))
                .thenReturn(List.of(lesson(1L, "Rhythm", 1, "Weak match", "Unrelated content", 0.60)));
        when(userLessonRepository.findByUserId(7L)).thenReturn(List.of());

        // Act
        RagResponse response = ragService.askQuestion(7L, new RagRequest("How do I practice bends?", null));

        // Assert
        assertFalse(response.grounded());
        assertTrue(response.sources().isEmpty());
        assertEquals(0.40, response.retrievalQuality(), 0.001);
        assertEquals("Retrieved lessons were not similar enough to ground an answer.", response.notice());
        assertTrue(response.answer().contains("do not have enough matching GuitarIO lesson context"));
        verify(chatModel, never()).call(anyString());
    }

    @Test
    void askQuestion_ShouldBuildStructuredGroundingPrompt_AndReturnOnlyCitedSources() {
        // Arrange
        when(lessonRepository.findSimilarLessonsForRag("[0.10000000,0.20000000]", 4))
                .thenReturn(List.of(
                        lesson(1L, "Picking", 2, "Alternate picking basics", "Pick down-up slowly.", 0.10),
                        lesson(2L, "Chords", 1, "Open chord shapes", "Practice G and C.", 0.20)
                ));
        when(userLessonRepository.findByUserId(7L)).thenReturn(List.of());
        when(chatModel.call(anyString())).thenReturn("Practice slow down-up strokes with a metronome. [Source 1]");

        // Act
        RagResponse response = ragService.askQuestion(7L, new RagRequest("How do I improve picking?", null));

        // Assert
        ArgumentCaptor<String> promptCaptor = ArgumentCaptor.forClass(String.class);
        verify(chatModel).call(promptCaptor.capture());
        String prompt = promptCaptor.getValue();

        assertTrue(prompt.contains("Answer only from the retrieved GuitarIO lesson context."));
        assertTrue(prompt.contains("Cite every lesson-derived claim"));
        assertTrue(prompt.contains("Do not invent lesson names, progress, citations, or facts"));
        assertTrue(prompt.contains("Source 1"));
        assertTrue(prompt.contains("Relevance: 0.90"));

        assertTrue(response.grounded());
        assertNull(response.notice());
        assertEquals(0.90, response.retrievalQuality(), 0.001);
        assertEquals(1, response.sources().size());
        assertEquals(1L, response.sources().getFirst().id());
        assertEquals(0.90, response.sources().getFirst().relevanceScore(), 0.001);
    }

    @Test
    void askQuestion_ShouldFallback_WhenGeneratedAnswerCitesUnknownSource() {
        // Arrange
        when(lessonRepository.findSimilarLessonsForRag("[0.10000000,0.20000000]", 4))
                .thenReturn(List.of(lesson(1L, "Picking", 2, "Alternate picking basics", "Pick down-up slowly.", 0.10)));
        when(userLessonRepository.findByUserId(7L)).thenReturn(List.of());
        when(chatModel.call(anyString())).thenReturn("Practice chromatic runs. [Source 2]");

        // Act
        RagResponse response = ragService.askQuestion(7L, new RagRequest("How do I improve picking?", null));

        // Assert
        assertFalse(response.grounded());
        assertTrue(response.sources().isEmpty());
        assertEquals("The generated answer did not cite the retrieved GuitarIO lesson context correctly.", response.notice());
    }

    @Test
    void askQuestion_ShouldFallback_WhenGeneratedAnswerHasNoSourceCitation() {
        // Arrange
        when(lessonRepository.findSimilarLessonsForRag("[0.10000000,0.20000000]", 4))
                .thenReturn(List.of(lesson(1L, "Picking", 2, "Alternate picking basics", "Pick down-up slowly.", 0.10)));
        when(userLessonRepository.findByUserId(7L)).thenReturn(List.of());
        when(chatModel.call(anyString())).thenReturn("Practice chromatic runs.");

        // Act
        RagResponse response = ragService.askQuestion(7L, new RagRequest("How do I improve picking?", null));

        // Assert
        assertFalse(response.grounded());
        assertTrue(response.sources().isEmpty());
        assertEquals("The generated answer did not cite the retrieved GuitarIO lesson context correctly.", response.notice());
    }

    private static RagLessonView lesson(
            Long id,
            String chapter,
            Integer number,
            String description,
            String content,
            Double distance
    ) {
        return new TestRagLessonView(id, chapter, number, description, content, distance);
    }

    private record TestRagLessonView(
            Long id,
            String chapter,
            Integer number,
            String description,
            String content,
            Double distance
    ) implements RagLessonView {

        @Override
        public Long getId() {
            return id;
        }

        @Override
        public String getChapter() {
            return chapter;
        }

        @Override
        public Integer getNumber() {
            return number;
        }

        @Override
        public String getContent() {
            return content;
        }

        @Override
        public String getDifficultyLevel() {
            return "BEGINNER";
        }

        @Override
        public String getDescription() {
            return description;
        }

        @Override
        public Double getDistance() {
            return distance;
        }
    }
}
