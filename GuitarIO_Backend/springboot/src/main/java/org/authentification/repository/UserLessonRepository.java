package org.authentification.repository;

import org.authentification.entity.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLessonRepository extends JpaRepository<UserLesson, Long> {
    List<UserLesson> findByUserId(Long userId);
    Optional<UserLesson> findByUserIdAndLessonId(Long userId, Long lessonId);
}
