package org.authentification.repository;

import org.authentification.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Optional<Lesson> findByChapterAndNumber(String chapter, Integer number);
    @Query("""
        SELECT l.chapter, l.number
        FROM Lesson l
        ORDER BY l.chapter, l.number
    """)
    List<Object[]> findChaptersWithNumbers();
}