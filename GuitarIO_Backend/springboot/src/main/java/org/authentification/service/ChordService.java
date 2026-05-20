package org.authentification.service;

import org.authentification.entity.Chord;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.ChordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChordService {

    private final ChordRepository chordRepository;

    public ChordService(ChordRepository chordRepository) {
        this.chordRepository = chordRepository;
    }

    public List<Chord> getAllChords() {
        return chordRepository.findAll();
    }

    public Optional<Chord> getChordById(Long id) {
        return chordRepository.findById(id);
    }

    public Optional<Chord> getChordByName(String name) {
        return chordRepository.findByName(name);
    }

    public Optional<Chord> getChordByNotation(String notation) {
        return chordRepository.findByNotation(notation);
    }

    public List<Chord> getChordsByDifficulty(DifficultyLevel level) {
        return chordRepository.findByDifficultyLevel(level);
    }

    public Chord createChord(Chord chord) {
        return chordRepository.save(chord);
    }

    public Chord updateChord(Long id, Chord updatedChord) {
        return chordRepository.findById(id)
                .map(chord -> {
                    chord.setName(updatedChord.getName());
                    chord.setNotation(updatedChord.getNotation());
                    chord.setDescription(updatedChord.getDescription());
                    chord.setFingeringPattern(updatedChord.getFingeringPattern());
                    chord.setDifficultyLevel(updatedChord.getDifficultyLevel());
                    chord.setTags(updatedChord.getTags());
                    return chordRepository.save(chord);
                })
                .orElseThrow(() -> new IllegalArgumentException("Chord not found"));
    }

    public void deleteChord(Long id) {
        chordRepository.deleteById(id);
    }
}
