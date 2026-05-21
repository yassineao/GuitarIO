CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE IF EXISTS lessons
    ADD COLUMN IF NOT EXISTS difficulty_level VARCHAR(255);

DO $$
BEGIN
    IF to_regclass('public.lessons') IS NOT NULL THEN
        UPDATE lessons
        SET difficulty_level = 'BEGINNER'
        WHERE difficulty_level IS NULL;
    END IF;
END $$;
