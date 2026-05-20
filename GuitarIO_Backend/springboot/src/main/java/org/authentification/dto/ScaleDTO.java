package org.authentification.dto;

public record ScaleDTO(
        Long id,
        String name,
        String root,
        String pattern,
        String description,
        String exercises,
        String difficultyLevel
) {}
