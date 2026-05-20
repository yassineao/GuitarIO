package org.authentification.dto;

public record MusicTheoryExplanationDTO(
        Long id,
        String topic,
        String content,
        String examples,
        String audioOrVisualReference,
        String difficultyLevel,
        String createdAt,
        String updatedAt
) {}
