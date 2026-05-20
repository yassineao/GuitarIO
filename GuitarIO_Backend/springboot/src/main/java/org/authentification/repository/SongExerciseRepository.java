package org.authentification.repository;

import org.authentification.entity.SongExercise;
import org.authentification.entity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongExerciseRepository extends JpaRepository<SongExercise, Long> {
    Optional<SongExercise> findBySongTitle(String songTitle);
    List<SongExercise> findByArtist(String artist);
    List<SongExercise> findByDifficultyLevel(DifficultyLevel difficultyLevel);
    List<SongExercise> findByMusicGenre(String musicGenre);
}
