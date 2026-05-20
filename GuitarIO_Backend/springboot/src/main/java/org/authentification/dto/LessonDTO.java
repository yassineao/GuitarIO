package org.authentification.dto;

import java.util.Set;

public record LessonDTO(
        Long id,
        String chapter,
        Integer number,
        String content,
        String description,
        String difficultyLevel,
        Set<ChordDTO> chords,
        Set<ScaleDTO> scales,
        Set<MusicTheoryExplanationDTO> theories,
        Set<StrummingPatternDTO> strummingPatterns,
        Set<SongExerciseDTO> songExercises,
        Set<TagDTO> tags
) {}
