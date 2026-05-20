package org.authentification.repository;

import org.authentification.entity.MusicTheoryExplanation;
import org.authentification.entity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MusicTheoryExplanationRepository extends JpaRepository<MusicTheoryExplanation, Long> {
    Optional<MusicTheoryExplanation> findByTopic(String topic);
    List<MusicTheoryExplanation> findByDifficultyLevel(DifficultyLevel difficultyLevel);
}
