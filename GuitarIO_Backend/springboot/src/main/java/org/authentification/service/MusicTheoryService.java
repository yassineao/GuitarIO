package org.authentification.service;

import org.authentification.entity.MusicTheoryExplanation;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.MusicTheoryExplanationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MusicTheoryService {

    private final MusicTheoryExplanationRepository theoryRepository;

    public MusicTheoryService(MusicTheoryExplanationRepository theoryRepository) {
        this.theoryRepository = theoryRepository;
    }

    public List<MusicTheoryExplanation> getAllExplanations() {
        return theoryRepository.findAll();
    }

    public Optional<MusicTheoryExplanation> getExplanationById(Long id) {
        return theoryRepository.findById(id);
    }

    public Optional<MusicTheoryExplanation> getExplanationByTopic(String topic) {
        return theoryRepository.findByTopic(topic);
    }

    public List<MusicTheoryExplanation> getExplanationsByDifficulty(DifficultyLevel level) {
        return theoryRepository.findByDifficultyLevel(level);
    }

    public MusicTheoryExplanation createExplanation(MusicTheoryExplanation explanation) {
        explanation.setCreatedAt(LocalDateTime.now());
        explanation.setUpdatedAt(LocalDateTime.now());
        return theoryRepository.save(explanation);
    }

    public MusicTheoryExplanation updateExplanation(Long id, MusicTheoryExplanation updatedExplanation) {
        return theoryRepository.findById(id)
                .map(explanation -> {
                    explanation.setTopic(updatedExplanation.getTopic());
                    explanation.setContent(updatedExplanation.getContent());
                    explanation.setExamples(updatedExplanation.getExamples());
                    explanation.setAudioOrVisualReference(updatedExplanation.getAudioOrVisualReference());
                    explanation.setDifficultyLevel(updatedExplanation.getDifficultyLevel());
                    explanation.setUpdatedAt(LocalDateTime.now());
                    explanation.setTags(updatedExplanation.getTags());
                    return theoryRepository.save(explanation);
                })
                .orElseThrow(() -> new IllegalArgumentException("Explanation not found"));
    }

    public void deleteExplanation(Long id) {
        theoryRepository.deleteById(id);
    }
}
