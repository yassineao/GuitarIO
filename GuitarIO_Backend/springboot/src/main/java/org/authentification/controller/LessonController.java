package org.authentification.controller;

import jakarta.persistence.Column;
import org.authentification.dto.TokenResponse;
import org.authentification.entity.Lesson;
import org.authentification.entity.User;
import org.authentification.entity.UserLesson;
import org.authentification.repository.LessonRepository;
import org.authentification.repository.UserLessonRepository;
import org.authentification.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    private final LessonRepository lessonRepo;
    private final UserRepository userRepo;
    private final UserLessonRepository userLessonRepo;

    public LessonController(LessonRepository lessonRepo,
                            UserRepository userRepo,
                            UserLessonRepository userLessonRepo) {
        this.lessonRepo = lessonRepo;
        this.userRepo = userRepo;
        this.userLessonRepo = userLessonRepo;
    }

    @GetMapping
    public List<UserLesson> myLessons(Authentication auth) {
        Long uid = (Long) auth.getPrincipal();
        return userLessonRepo.findByUserId(uid);
    }

    // ✅ Create a NEW shared lesson (admin-like operation usually)
    @PostMapping
    public ResponseEntity<?> createLesson(@RequestBody Lesson lesson) {
        lesson.setId(null);
        Lesson saved = lessonRepo.save(lesson);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ Assign an existing lesson to logged-in user
    // Body: { "lessonId": 1 }
    @PostMapping("/assign")
    public ResponseEntity<?> assignToMe(@RequestBody Map<String, Long> body, Authentication auth) {
        Long uid = (Long) auth.getPrincipal();
        Long lessonId = body.get("lessonId");

        if (lessonId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "lessonId is required"));
        }

        User user = userRepo.findById(uid).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));

        Lesson lesson = lessonRepo.findById(lessonId).orElse(null);
        if (lesson == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Lesson not found"));

        if (userLessonRepo.findByUserIdAndLessonId(uid, lessonId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Lesson already assigned"));
        }

        UserLesson ul = new UserLesson();
        ul.setUser(user);
        ul.setLesson(lesson);
        ul.setIsAvailable(true);
        ul.setIsCompleted(false);

        return ResponseEntity.status(HttpStatus.CREATED).body(userLessonRepo.save(ul));
    }

    @GetMapping("/lesson/{chapter}/{number}")
    public ResponseEntity<?> getLesson(
            @PathVariable String chapter,
            @PathVariable Integer number) {

        return lessonRepo.findByChapterAndNumber(chapter, number)
                .map(lesson -> ResponseEntity.ok(Map.of("content", lesson.getContent())))
                .orElse(ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Lesson not found")));
    }
    @GetMapping("/chapters")
    public ResponseEntity<?> getChapters(
            @PathVariable String chapter,
            @PathVariable Integer number) {

        return lessonRepo.findByChapterAndNumber(chapter, number)
                .map(lesson -> ResponseEntity.ok(Map.of("content", lesson.getContent())))
                .orElse(ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Lesson not found")));
    }

    @GetMapping("/chapters-with-numbers")
    public ResponseEntity<?> getChaptersWithNumbers() {

        List<Object[]> rows = lessonRepo.findChaptersWithNumbers();

        Map<String, List<Integer>> result = new LinkedHashMap<>();

        for (Object[] row : rows) {
            String chapter = (String) row[0];
            Integer number = (Integer) row[1];

            result.computeIfAbsent(chapter, k -> new ArrayList<>()).add(number);
        }

        return ResponseEntity.ok(result);
    }

    // ✅ Mark completion FOR THIS USER only
    @PatchMapping("/{lessonId}/complete")
    public ResponseEntity<?> markComplete(@PathVariable Long lessonId, Authentication auth) {
        Long uid = (Long) auth.getPrincipal();

        UserLesson ul = userLessonRepo.findByUserIdAndLessonId(uid, lessonId).orElse(null);
        if (ul == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Lesson not assigned to you"));
        }

        ul.setIsCompleted(true);
        return ResponseEntity.ok(userLessonRepo.save(ul));
    }
}
