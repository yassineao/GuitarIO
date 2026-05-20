package org.authentification.repository;

import org.authentification.entity.Scale;
import org.authentification.entity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScaleRepository extends JpaRepository<Scale, Long> {
    Optional<Scale> findByName(String name);
    List<Scale> findByRoot(String root);
    List<Scale> findByDifficultyLevel(DifficultyLevel difficultyLevel);
}
