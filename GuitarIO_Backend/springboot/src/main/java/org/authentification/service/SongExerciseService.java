package org.authentification.service;

import org.authentification.entity.SongExercise;
import org.authentification.entity.DifficultyLevel;
import org.authentification.repository.SongExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongExerciseService {

    private final SongExerciseRepository exerciseRepository;

    public SongExerciseService(SongExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<SongExercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public Optional<SongExercise> getExerciseById(Long id) {
        return exerciseRepository.findById(id);
    }

    public Optional<SongExercise> getExerciseBySongTitle(String songTitle) {
        return exerciseRepository.findBySongTitle(songTitle);
    }

    public List<SongExercise> getExercisesByArtist(String artist) {
        return exerciseRepository.findByArtist(artist);
    }

    public List<SongExercise> getExercisesByDifficulty(DifficultyLevel level) {
        return exerciseRepository.findByDifficultyLevel(level);
    }

    public List<SongExercise> getExercisesByGenre(String genre) {
        return exerciseRepository.findByMusicGenre(genre);
    }

    public SongExercise createExercise(SongExercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public SongExercise updateExercise(Long id, SongExercise updatedExercise) {
        return exerciseRepository.findById(id)
                .map(exercise -> {
                    exercise.setSongTitle(updatedExercise.getSongTitle());
                    exercise.setArtist(updatedExercise.getArtist());
                    exercise.setDescription(updatedExercise.getDescription());
                    exercise.setLyrics(updatedExercise.getLyrics());
                    exercise.setChordSequence(updatedExercise.getChordSequence());
                    exercise.setDifficultyLevel(updatedExercise.getDifficultyLevel());
                    exercise.setMusicGenre(updatedExercise.getMusicGenre());
                    exercise.setBpm(updatedExercise.getBpm());
                    exercise.setStrummingTips(updatedExercise.getStrummingTips());
                    exercise.setRequiredChords(updatedExercise.getRequiredChords());
                    exercise.setTags(updatedExercise.getTags());
                    return exerciseRepository.save(exercise);
                })
                .orElseThrow(() -> new IllegalArgumentException("Exercise not found"));
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
