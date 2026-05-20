-- GuitarIO Music Learning Features - Database Setup
-- This SQL file documents the tables that will be created via Hibernate JPA
-- Database: PostgreSQL

-- Tables created automatically by Spring Boot/Hibernate JPA:

-- 1. Tags table
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

-- 2. Chords table
CREATE TABLE chords (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    notation VARCHAR(255) NOT NULL,
    description TEXT,
    fingering_pattern TEXT,
    difficulty_level VARCHAR(50) NOT NULL DEFAULT 'BEGINNER'
);

-- 3. Chord Tags junction table
CREATE TABLE chord_tags (
    chord_id BIGINT NOT NULL REFERENCES chords(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (chord_id, tag_id)
);

-- 4. Scales table
CREATE TABLE scales (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    root VARCHAR(10) NOT NULL,
    pattern TEXT,
    description TEXT,
    exercises TEXT,
    difficulty_level VARCHAR(50) NOT NULL DEFAULT 'BEGINNER'
);

-- 5. Scale Tags junction table
CREATE TABLE scale_tags (
    scale_id BIGINT NOT NULL REFERENCES scales(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (scale_id, tag_id)
);

-- 6. Music Theory Explanations table
CREATE TABLE music_theory_explanations (
    id BIGSERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    examples TEXT,
    audio_or_visual_reference TEXT,
    difficulty_level VARCHAR(50) NOT NULL DEFAULT 'BEGINNER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Theory Tags junction table
CREATE TABLE theory_tags (
    theory_id BIGINT NOT NULL REFERENCES music_theory_explanations(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (theory_id, tag_id)
);

-- 8. Strumming Patterns table
CREATE TABLE strumming_patterns (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    pattern TEXT,
    bpm INTEGER,
    music_style_tag VARCHAR(255),
    difficulty_level VARCHAR(50) NOT NULL DEFAULT 'BEGINNER'
);

-- 9. Strumming Pattern Tags junction table
CREATE TABLE strumming_pattern_tags (
    pattern_id BIGINT NOT NULL REFERENCES strumming_patterns(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (pattern_id, tag_id)
);

-- 10. Song Exercises table
CREATE TABLE song_exercises (
    id BIGSERIAL PRIMARY KEY,
    song_title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    description TEXT,
    lyrics TEXT,
    chord_sequence TEXT,
    difficulty_level VARCHAR(50) NOT NULL DEFAULT 'INTERMEDIATE',
    music_genre VARCHAR(255),
    bpm VARCHAR(10),
    strumming_tips TEXT
);

-- 11. Exercise Chords junction table
CREATE TABLE exercise_chords (
    exercise_id BIGINT NOT NULL REFERENCES song_exercises(id) ON DELETE CASCADE,
    chord_id BIGINT NOT NULL REFERENCES chords(id) ON DELETE CASCADE,
    PRIMARY KEY (exercise_id, chord_id)
);

-- 12. Exercise Tags junction table
CREATE TABLE exercise_tags (
    exercise_id BIGINT NOT NULL REFERENCES song_exercises(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (exercise_id, tag_id)
);

-- 13. Lesson Tags junction table (NEW - for updated Lesson entity)
CREATE TABLE lesson_tags (
    lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, tag_id)
);

-- 14. Lesson Chords junction table (NEW)
CREATE TABLE lesson_chords (
    lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    chord_id BIGINT NOT NULL REFERENCES chords(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, chord_id)
);

-- 15. Lesson Scales junction table (NEW)
CREATE TABLE lesson_scales (
    lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    scale_id BIGINT NOT NULL REFERENCES scales(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, scale_id)
);

-- 16. Lesson Theories junction table (NEW)
CREATE TABLE lesson_theories (
    lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    theory_id BIGINT NOT NULL REFERENCES music_theory_explanations(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, theory_id)
);

-- 17. Lesson Strumming Patterns junction table (NEW)
CREATE TABLE lesson_strumming_patterns (
    lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    pattern_id BIGINT NOT NULL REFERENCES strumming_patterns(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, pattern_id)
);

-- 18. Lesson Song Exercises junction table (NEW)
CREATE TABLE lesson_song_exercises (
    lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    exercise_id BIGINT NOT NULL REFERENCES song_exercises(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, exercise_id)
);

-- Update Lesson table to add new columns
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS difficulty_level VARCHAR(50) DEFAULT 'BEGINNER';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS description TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chord_difficulty ON chords(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_scale_difficulty ON scales(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_scale_root ON scales(root);
CREATE INDEX IF NOT EXISTS idx_theory_difficulty ON music_theory_explanations(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_pattern_difficulty ON strumming_patterns(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_pattern_style ON strumming_patterns(music_style_tag);
CREATE INDEX IF NOT EXISTS idx_exercise_difficulty ON song_exercises(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_exercise_genre ON song_exercises(music_genre);
CREATE INDEX IF NOT EXISTS idx_exercise_artist ON song_exercises(artist);
CREATE INDEX IF NOT EXISTS idx_lesson_difficulty ON lessons(difficulty_level);

-- Notes:
-- 1. These tables are automatically created by Hibernate when Spring Boot starts
-- 2. No manual SQL execution needed if running with spring.jpa.hibernate.ddl-auto=create or update
-- 3. For production, use Liquibase or Flyway for version control
-- 4. Ensure sequences exist for BIGSERIAL columns
