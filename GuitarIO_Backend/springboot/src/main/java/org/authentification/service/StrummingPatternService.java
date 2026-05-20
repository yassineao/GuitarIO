package org.authentification.service;

import org.authentification.entity.StrummingPattern;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.StrummingPatternRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StrummingPatternService {

    private final StrummingPatternRepository patternRepository;

    public StrummingPatternService(StrummingPatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    public List<StrummingPattern> getAllPatterns() {
        return patternRepository.findAll();
    }

    public Optional<StrummingPattern> getPatternById(Long id) {
        return patternRepository.findById(id);
    }

    public Optional<StrummingPattern> getPatternByName(String name) {
        return patternRepository.findByName(name);
    }

    public List<StrummingPattern> getPatternsByDifficulty(DifficultyLevel level) {
        return patternRepository.findByDifficultyLevel(level);
    }

    public List<StrummingPattern> getPatternsByStyle(String style) {
        return patternRepository.findByMusicStyleTag(style);
    }

    public StrummingPattern createPattern(StrummingPattern pattern) {
        return patternRepository.save(pattern);
    }

    public StrummingPattern updatePattern(Long id, StrummingPattern updatedPattern) {
        return patternRepository.findById(id)
                .map(pattern -> {
                    pattern.setName(updatedPattern.getName());
                    pattern.setDescription(updatedPattern.getDescription());
                    pattern.setPattern(updatedPattern.getPattern());
                    pattern.setBpm(updatedPattern.getBpm());
                    pattern.setMusicStyleTag(updatedPattern.getMusicStyleTag());
                    pattern.setDifficultyLevel(updatedPattern.getDifficultyLevel());
                    pattern.setTags(updatedPattern.getTags());
                    return patternRepository.save(pattern);
                })
                .orElseThrow(() -> new IllegalArgumentException("Pattern not found"));
    }

    public void deletePattern(Long id) {
        patternRepository.deleteById(id);
    }
}
