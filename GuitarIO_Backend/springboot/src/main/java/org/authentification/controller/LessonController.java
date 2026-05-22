package org.authentification.controller;

import org.authentification.entity.DifficultyLevel;
import org.authentification.entity.Lesson;
import org.authentification.entity.UserLesson;
import org.authentification.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lessons")
public class LessonController {

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
        return ResponseEntity.ok(lessonService.getLessonContent(chapter, number));
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
