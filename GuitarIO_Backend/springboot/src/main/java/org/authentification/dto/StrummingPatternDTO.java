package org.authentification.dto;

public record StrummingPatternDTO(
        Long id,
        String name,
        String description,
        String pattern,
        Integer bpm,
        String musicStyleTag,
        String difficultyLevel
) {}
