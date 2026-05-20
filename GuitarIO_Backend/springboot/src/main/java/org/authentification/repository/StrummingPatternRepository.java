package org.authentification.repository;

import org.authentification.entity.StrummingPattern;
import org.authentification.entity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StrummingPatternRepository extends JpaRepository<StrummingPattern, Long> {
    Optional<StrummingPattern> findByName(String name);
    List<StrummingPattern> findByDifficultyLevel(DifficultyLevel difficultyLevel);
    List<StrummingPattern> findByMusicStyleTag(String musicStyleTag);
}
