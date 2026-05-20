package org.authentification.repository;

import org.authentification.entity.Chord;
import org.authentification.entity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChordRepository extends JpaRepository<Chord, Long> {
    Optional<Chord> findByName(String name);
    Optional<Chord> findByNotation(String notation);
    List<Chord> findByDifficultyLevel(DifficultyLevel difficultyLevel);
}
