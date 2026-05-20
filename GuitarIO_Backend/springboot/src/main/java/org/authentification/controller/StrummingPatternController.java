package org.authentification.controller;

import org.authentification.entity.StrummingPattern;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.StrummingPatternRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/strumming-patterns")
public class StrummingPatternController {

    private final StrummingPatternRepository patternRepository;

    public StrummingPatternController(StrummingPatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    @GetMapping
    public List<StrummingPattern> getAllPatterns() {
        return patternRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPatternById(@PathVariable Long id) {
        return patternRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Pattern not found")));
    }

    @GetMapping("/difficulty/{level}")
    public List<StrummingPattern> getPatternsByDifficulty(@PathVariable DifficultyLevel level) {
        return patternRepository.findByDifficultyLevel(level);
    }

    @GetMapping("/style/{style}")
    public List<StrummingPattern> getPatternsByStyle(@PathVariable String style) {
        return patternRepository.findByMusicStyleTag(style);
    }

    @PostMapping
    public ResponseEntity<?> createPattern(@RequestBody StrummingPattern pattern) {
        if (patternRepository.findByName(pattern.getName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Pattern already exists"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(patternRepository.save(pattern));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePattern(@PathVariable Long id, @RequestBody StrummingPattern updatedPattern) {
        return patternRepository.findById(id)
                .<ResponseEntity<?>>map(pattern -> {
                    pattern.setName(updatedPattern.getName());
                    pattern.setDescription(updatedPattern.getDescription());
                    pattern.setPattern(updatedPattern.getPattern());
                    pattern.setBpm(updatedPattern.getBpm());
                    pattern.setMusicStyleTag(updatedPattern.getMusicStyleTag());
                    pattern.setDifficultyLevel(updatedPattern.getDifficultyLevel());
                    pattern.setTags(updatedPattern.getTags());
                    return ResponseEntity.ok(patternRepository.save(pattern));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Pattern not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePattern(@PathVariable Long id) {
        if (!patternRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Pattern not found"));
        }
        patternRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Pattern deleted"));
    }
}
