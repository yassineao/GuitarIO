package org.authentification.dto;

public record ChordDTO(
        Long id,
        String name,
        String notation,
        String description,
        String fingeringPattern,
        String difficultyLevel
) {}
