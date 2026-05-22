package org.authentification.controller;

import org.authentification.entity.DifficultyLevel;
import org.authentification.entity.Lesson;
import org.authentification.entity.UserLesson;
import org.authentification.service.LessonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    private static final Logger log = LoggerFactory.getLogger(LessonController.class);

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public List<UserLesson> myLessons(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return lessonService.getMyLessons(userId);
    }

    @PostMapping
    public ResponseEntity<Lesson> createLesson(@RequestBody String chapter, Integer number , String content , DifficultyLevel difficultyLevel, String description) {
        Lesson savedLesson = lessonService.createLesson( chapter,  number ,  content ,  difficultyLevel,  description);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLesson);
    }

    @PostMapping("/assign")
    public ResponseEntity<UserLesson> assignToMe(
            @RequestBody Map<String, Long> body,
            Authentication auth
    ) {
        Long userId = (Long) auth.getPrincipal();
        Long lessonId = body.get("lessonId");

        UserLesson userLesson = lessonService.assignLessonToUser(userId, lessonId);
        return ResponseEntity.status(HttpStatus.CREATED).body(userLesson);
    }

    @GetMapping({"/{chapter}/{number}", "/lesson/{chapter}/{number}"})
    public ResponseEntity<Map<String, String>> getLesson(
            @PathVariable String chapter,
            @PathVariable Integer number
    ) {
        return getLessonResponse(chapter, number);
    }

    @GetMapping("/content")
    public ResponseEntity<Map<String, String>> getLessonByQuery(
            @RequestParam String chapter,
            @RequestParam Integer number
    ) {
        return getLessonResponse(chapter, number);
    }

    private ResponseEntity<Map<String, String>> getLessonResponse(String chapter, Integer number) {
        try {
            return ResponseEntity.ok(lessonService.getLessonContent(chapter, number));
        } catch (ResponseStatusException ex) {
            log.warn("Could not fetch lesson chapter='{}' number={}: {}", chapter, number, ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(Map.of(
                    "error", "LESSON_LOOKUP_FAILED",
                    "message", ex.getReason() == null ? "Lesson lookup failed" : ex.getReason(),
                    "chapter", chapter,
                    "number", String.valueOf(number)
            ));
        } catch (Exception ex) {
            log.error("Unexpected error while fetching lesson chapter='{}' number={}", chapter, number, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "LESSON_UNEXPECTED_ERROR",
                    "message", ex.getClass().getSimpleName() + ": " + ex.getMessage(),
                    "chapter", chapter,
                    "number", String.valueOf(number)
            ));
        }
    }

    @GetMapping("/chapters-with-numbers")
    public ResponseEntity<Map<String, List<Integer>>> getChaptersWithNumbers() {
        return ResponseEntity.ok(lessonService.getChaptersWithNumbers());
    }

    @PatchMapping("/{lessonId}/complete")
    public ResponseEntity<UserLesson> markComplete(
            @PathVariable Long lessonId,
            Authentication auth
    ) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(lessonService.markLessonComplete(userId, lessonId));
    }
}
