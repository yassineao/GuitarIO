package org.authentification.repository;

import org.authentification.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Optional<Lesson> findByChapterAndNumber(String chapter, Integer number);

    @Query("""
        SELECT l.content
        FROM Lesson l
        WHERE l.chapter = :chapter AND l.number = :number
    """)
    Optional<String> findContentByChapterAndNumber(
            @Param("chapter") String chapter,
            @Param("number") Integer number
    );

    @Query("""
        SELECT l.chapter, l.number
        FROM Lesson l
        ORDER BY l.chapter, l.number
    """)
    List<Object[]> findChaptersWithNumbers();
    @Query(
            value = """
            SELECT
                id,
                chapter,
                number,
                content,
                difficulty_level AS "difficultyLevel",
                description,
                embedding <=> CAST(:embedding AS vector) AS distance
            FROM lessons
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> CAST(:embedding AS vector)
            LIMIT :limit
        """,
            nativeQuery = true
    )
    List<RagLessonView> findSimilarLessonsForRag(
            @Param("embedding") String embedding,
            @Param("limit") int limit
    );

    interface RagLessonView {
        Long getId();
        String getChapter();
        Integer getNumber();
        String getContent();
        String getDifficultyLevel();
        String getDescription();
        Double getDistance();
    }
}
