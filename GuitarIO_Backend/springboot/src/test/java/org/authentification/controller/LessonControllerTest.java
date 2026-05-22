package org.authentification.controller;

import org.authentification.config.SecurityConfig;
import org.authentification.service.JwtService;
import org.authentification.service.LessonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

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
    void getLesson_ShouldKeepLegacyLessonPathWorking_WhenAuthenticated() throws Exception {
        when(lessonService.getLessonContent("Beginner", 1))
                .thenReturn(Map.of("content", "Tune each string before you start."));

        mockMvc.perform(get("/lessons/lesson/Beginner/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Tune each string before you start."));
    }
}
