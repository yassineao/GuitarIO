package org.authentification.controller;

import org.authentification.config.SecurityConfig;
import org.authentification.service.JwtService;
import org.authentification.service.LessonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LessonController.class)
@AutoConfigureMockMvc
@Import(SecurityConfig.class)
class LessonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private LessonService lessonService;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void getLesson_ShouldReturnUnauthorized_WhenNotAuthenticated() throws Exception {
        mockMvc.perform(get("/lessons/Beginner/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getLesson_ShouldReturnContent_WhenAuthenticated() throws Exception {
        when(lessonService.getLessonContent("Beginner", 1))
                .thenReturn(Map.of("content", "Tune each string before you start."));

        mockMvc.perform(get("/lessons/Beginner/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Tune each string before you start."));
    }

    @Test
    @WithMockUser
    void getLessonByQuery_ShouldReturnContent_WhenChapterContainsPathUnsafeCharacters() throws Exception {
        when(lessonService.getLessonContent("Beginner / Rhythm", 1))
                .thenReturn(Map.of("content", "Count steadily before changing chords."));

        mockMvc.perform(get("/lessons/content")
                        .param("chapter", "Beginner / Rhythm")
                        .param("number", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Count steadily before changing chords."));
    }

    @Test
    @WithMockUser
    void getLesson_ShouldKeepLegacyLessonPathWorking_WhenAuthenticated() throws Exception {
        when(lessonService.getLessonContent("Beginner", 1))
                .thenReturn(Map.of("content", "Tune each string before you start."));

        mockMvc.perform(get("/lessons/lesson/Beginner/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Tune each string before you start."));
    }

    @Test
    @WithMockUser
    void getLesson_ShouldReturnRealLookupError_WhenLessonIsMissing() throws Exception {
        when(lessonService.getLessonContent("Missing", 99))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found"));

        mockMvc.perform(get("/lessons/Missing/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("LESSON_LOOKUP_FAILED"))
                .andExpect(jsonPath("$.message").value("Lesson not found"))
                .andExpect(jsonPath("$.chapter").value("Missing"))
                .andExpect(jsonPath("$.number").value("99"));
    }

    @Test
    @WithMockUser
    void getLesson_ShouldReturnRealUnexpectedError_WhenServiceCrashes() throws Exception {
        when(lessonService.getLessonContent("Beginner", 2))
                .thenThrow(new IllegalStateException("Database connection dropped"));

        mockMvc.perform(get("/lessons/Beginner/2"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.error").value("LESSON_UNEXPECTED_ERROR"))
                .andExpect(jsonPath("$.message").value("IllegalStateException: Database connection dropped"))
                .andExpect(jsonPath("$.chapter").value("Beginner"))
                .andExpect(jsonPath("$.number").value("2"));
    }
}
