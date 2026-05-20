package org.authentification.dto;

public record SongExerciseDTO(
        Long id,
        String songTitle,
        String artist,
        String description,
        String lyrics,
        String chordSequence,
        String difficultyLevel,
        String musicGenre,
        String bpm,
        String strummingTips
) {}
