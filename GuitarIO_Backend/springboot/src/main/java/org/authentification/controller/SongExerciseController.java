package org.authentification.controller;

import org.authentification.entity.SongExercise;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.SongExerciseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/song-exercises")
public class SongExerciseController {

    private final SongExerciseRepository exerciseRepository;

    public SongExerciseController(SongExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping
    public List<SongExercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExerciseById(@PathVariable Long id) {
        return exerciseRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Exercise not found")));
    }

    @GetMapping("/difficulty/{level}")
    public List<SongExercise> getExercisesByDifficulty(@PathVariable DifficultyLevel level) {
        return exerciseRepository.findByDifficultyLevel(level);
    }

    @GetMapping("/artist/{artist}")
    public List<SongExercise> getExercisesByArtist(@PathVariable String artist) {
        return exerciseRepository.findByArtist(artist);
    }

    @GetMapping("/genre/{genre}")
    public List<SongExercise> getExercisesByGenre(@PathVariable String genre) {
        return exerciseRepository.findByMusicGenre(genre);
    }

    @PostMapping
    public ResponseEntity<?> createExercise(@RequestBody SongExercise exercise) {
        if (exerciseRepository.findBySongTitle(exercise.getSongTitle()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Exercise already exists"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(exerciseRepository.save(exercise));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExercise(@PathVariable Long id, @RequestBody SongExercise updatedExercise) {
        return exerciseRepository.findById(id)
                .<ResponseEntity<?>>map(exercise -> {
                    exercise.setSongTitle(updatedExercise.getSongTitle());
                    exercise.setArtist(updatedExercise.getArtist());
                    exercise.setDescription(updatedExercise.getDescription());
                    exercise.setLyrics(updatedExercise.getLyrics());
                    exercise.setChordSequence(updatedExercise.getChordSequence());
                    exercise.setDifficultyLevel(updatedExercise.getDifficultyLevel());
                    exercise.setMusicGenre(updatedExercise.getMusicGenre());
                    exercise.setBpm(updatedExercise.getBpm());
                    exercise.setStrummingTips(updatedExercise.getStrummingTips());
                    exercise.setRequiredChords(updatedExercise.getRequiredChords());
                    exercise.setTags(updatedExercise.getTags());
                    return ResponseEntity.ok(exerciseRepository.save(exercise));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Exercise not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExercise(@PathVariable Long id) {
        if (!exerciseRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Exercise not found"));
        }
        exerciseRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Exercise deleted"));
    }
}
