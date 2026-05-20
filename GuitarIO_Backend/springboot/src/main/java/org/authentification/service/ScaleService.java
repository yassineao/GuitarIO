package org.authentification.service;

import org.authentification.entity.Scale;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.ScaleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScaleService {

    private final ScaleRepository scaleRepository;

    public ScaleService(ScaleRepository scaleRepository) {
        this.scaleRepository = scaleRepository;
    }

    public List<Scale> getAllScales() {
        return scaleRepository.findAll();
    }

    public Optional<Scale> getScaleById(Long id) {
        return scaleRepository.findById(id);
    }

    public Optional<Scale> getScaleByName(String name) {
        return scaleRepository.findByName(name);
    }

    public List<Scale> getScalesByRoot(String root) {
        return scaleRepository.findByRoot(root);
    }

    public List<Scale> getScalesByDifficulty(DifficultyLevel level) {
        return scaleRepository.findByDifficultyLevel(level);
    }

    public Scale createScale(Scale scale) {
        return scaleRepository.save(scale);
    }

    public Scale updateScale(Long id, Scale updatedScale) {
        return scaleRepository.findById(id)
                .map(scale -> {
                    scale.setName(updatedScale.getName());
                    scale.setRoot(updatedScale.getRoot());
                    scale.setPattern(updatedScale.getPattern());
                    scale.setDescription(updatedScale.getDescription());
                    scale.setExercises(updatedScale.getExercises());
                    scale.setDifficultyLevel(updatedScale.getDifficultyLevel());
                    scale.setTags(updatedScale.getTags());
                    return scaleRepository.save(scale);
                })
                .orElseThrow(() -> new IllegalArgumentException("Scale not found"));
    }

    public void deleteScale(Long id) {
        scaleRepository.deleteById(id);
    }
}
