package org.authentification.controller;

import org.authentification.entity.Scale;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.ScaleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scales")
public class ScaleController {

    private final ScaleRepository scaleRepository;

    public ScaleController(ScaleRepository scaleRepository) {
        this.scaleRepository = scaleRepository;
    }

    @GetMapping
    public List<Scale> getAllScales() {
        return scaleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getScaleById(@PathVariable Long id) {
        return scaleRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Scale not found")));
    }

    @GetMapping("/difficulty/{level}")
    public List<Scale> getScalesByDifficulty(@PathVariable DifficultyLevel level) {
        return scaleRepository.findByDifficultyLevel(level);
    }

    @GetMapping("/root/{root}")
    public List<Scale> getScalesByRoot(@PathVariable String root) {
        return scaleRepository.findByRoot(root);
    }

    @PostMapping
    public ResponseEntity<?> createScale(@RequestBody Scale scale) {
        if (scaleRepository.findByName(scale.getName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Scale already exists"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(scaleRepository.save(scale));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateScale(@PathVariable Long id, @RequestBody Scale updatedScale) {
        return scaleRepository.findById(id)
                .<ResponseEntity<?>>map(scale -> {
                    scale.setName(updatedScale.getName());
                    scale.setRoot(updatedScale.getRoot());
                    scale.setPattern(updatedScale.getPattern());
                    scale.setDescription(updatedScale.getDescription());
                    scale.setExercises(updatedScale.getExercises());
                    scale.setDifficultyLevel(updatedScale.getDifficultyLevel());
                    scale.setTags(updatedScale.getTags());
                    return ResponseEntity.ok(scaleRepository.save(scale));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Scale not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteScale(@PathVariable Long id) {
        if (!scaleRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Scale not found"));
        }
        scaleRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Scale deleted"));
    }
}
