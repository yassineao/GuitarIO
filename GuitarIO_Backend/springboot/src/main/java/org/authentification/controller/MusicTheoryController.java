package org.authentification.controller;

import org.authentification.entity.MusicTheoryExplanation;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.MusicTheoryExplanationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/music-theory")
public class MusicTheoryController {

    private final MusicTheoryExplanationRepository theoryRepository;

    public MusicTheoryController(MusicTheoryExplanationRepository theoryRepository) {
        this.theoryRepository = theoryRepository;
    }

    @GetMapping
    public List<MusicTheoryExplanation> getAllExplanations() {
        return theoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExplanationById(@PathVariable Long id) {
        return theoryRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Explanation not found")));
    }

    @GetMapping("/difficulty/{level}")
    public List<MusicTheoryExplanation> getExplanationsByDifficulty(@PathVariable DifficultyLevel level) {
        return theoryRepository.findByDifficultyLevel(level);
    }

    @PostMapping
    public ResponseEntity<?> createExplanation(@RequestBody MusicTheoryExplanation explanation) {
        if (theoryRepository.findByTopic(explanation.getTopic()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Topic already exists"));
        }
        explanation.setCreatedAt(LocalDateTime.now());
        explanation.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(theoryRepository.save(explanation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExplanation(@PathVariable Long id, @RequestBody MusicTheoryExplanation updatedExplanation) {
        return theoryRepository.findById(id)
                .<ResponseEntity<?>>map(explanation -> {
                    explanation.setTopic(updatedExplanation.getTopic());
                    explanation.setContent(updatedExplanation.getContent());
                    explanation.setExamples(updatedExplanation.getExamples());
                    explanation.setAudioOrVisualReference(updatedExplanation.getAudioOrVisualReference());
                    explanation.setDifficultyLevel(updatedExplanation.getDifficultyLevel());
                    explanation.setUpdatedAt(LocalDateTime.now());
                    explanation.setTags(updatedExplanation.getTags());
                    return ResponseEntity.ok(theoryRepository.save(explanation));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Explanation not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExplanation(@PathVariable Long id) {
        if (!theoryRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Explanation not found"));
        }
        theoryRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Explanation deleted"));
    }
}
