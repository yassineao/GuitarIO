package org.authentification.controller;

import org.authentification.entity.Chord;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.ChordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chords")
public class ChordController {

    private final ChordRepository chordRepository;

    public ChordController(ChordRepository chordRepository) {
        this.chordRepository = chordRepository;
    }

    @GetMapping
    public List<Chord> getAllChords() {
        return chordRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChordById(@PathVariable Long id) {
        return chordRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Chord not found")));
    }

    @GetMapping("/difficulty/{level}")
    public List<Chord> getChordsByDifficulty(@PathVariable DifficultyLevel level) {
        return chordRepository.findByDifficultyLevel(level);
    }

    @PostMapping
    public ResponseEntity<?> createChord(@RequestBody Chord chord) {
        if (chordRepository.findByNotation(chord.getNotation()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Chord already exists"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(chordRepository.save(chord));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateChord(@PathVariable Long id, @RequestBody Chord updatedChord) {
        return chordRepository.findById(id)
                .<ResponseEntity<?>>map(chord -> {
                    chord.setName(updatedChord.getName());
                    chord.setNotation(updatedChord.getNotation());
                    chord.setDescription(updatedChord.getDescription());
                    chord.setFingeringPattern(updatedChord.getFingeringPattern());
                    chord.setDifficultyLevel(updatedChord.getDifficultyLevel());
                    chord.setTags(updatedChord.getTags());
                    return ResponseEntity.ok(chordRepository.save(chord));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Chord not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChord(@PathVariable Long id) {
        if (!chordRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Chord not found"));
        }
        chordRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Chord deleted"));
    }
}
