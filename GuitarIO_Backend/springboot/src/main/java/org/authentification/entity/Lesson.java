package org.authentification.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String chapter;

    @Column(nullable = false)
    private Integer number;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel difficultyLevel = DifficultyLevel.BEGINNER;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "vector(768)")
    private float[] embedding;

    public float[] getEmbedding() {
        return embedding;
    }

    public void setEmbedding(float[] embedding) {
        this.embedding = embedding;
    }

    // 🔗 one lesson -> many user-lesson relations
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserLesson> userLessons = new ArrayList<>();

    // 🔗 Relationships to learning resources
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "lesson_chords",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "chord_id")
    )
    private Set<Chord> chords = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "lesson_scales",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "scale_id")
    )
    private Set<Scale> scales = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "lesson_theories",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "theory_id")
    )
    private Set<MusicTheoryExplanation> theories = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "lesson_strumming_patterns",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "pattern_id")
    )
    private Set<StrummingPattern> strummingPatterns = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "lesson_song_exercises",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id")
    )
    private Set<SongExercise> songExercises = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "lesson_tags",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    // ===== getters & setters =====

    public List<UserLesson> getUserLessons() {
        return userLessons;
    }

    public void setUserLessons(List<UserLesson> userLessons) {
        this.userLessons = userLessons;
    }

    public Long getId() { return id; }
    public String getChapter() { return chapter; }
    public Integer getNumber() { return number; }
    public String getContent() { return content; }
    public DifficultyLevel getDifficultyLevel() { return difficultyLevel; }
    public String getDescription() { return description; }

    public void setId(Long id) { this.id = id; }
    public void setChapter(String chapter) { this.chapter = chapter; }
    public void setNumber(Integer number) { this.number = number; }
    public void setContent(String content) { this.content = content; }
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    public void setDescription(String description) { this.description = description; }

    public Set<Chord> getChords() { return chords; }
    public void setChords(Set<Chord> chords) { this.chords = chords; }
    public void addChord(Chord chord) { chords.add(chord); }
    public void removeChord(Chord chord) { chords.remove(chord); }

    public Set<Scale> getScales() { return scales; }
    public void setScales(Set<Scale> scales) { this.scales = scales; }
    public void addScale(Scale scale) { scales.add(scale); }
    public void removeScale(Scale scale) { scales.remove(scale); }

    public Set<MusicTheoryExplanation> getTheories() { return theories; }
    public void setTheories(Set<MusicTheoryExplanation> theories) { this.theories = theories; }
    public void addTheory(MusicTheoryExplanation theory) { theories.add(theory); }
    public void removeTheory(MusicTheoryExplanation theory) { theories.remove(theory); }

    public Set<StrummingPattern> getStrummingPatterns() { return strummingPatterns; }
    public void setStrummingPatterns(Set<StrummingPattern> strummingPatterns) { this.strummingPatterns = strummingPatterns; }
    public void addStrummingPattern(StrummingPattern pattern) { strummingPatterns.add(pattern); }
    public void removeStrummingPattern(StrummingPattern pattern) { strummingPatterns.remove(pattern); }

    public Set<SongExercise> getSongExercises() { return songExercises; }
    public void setSongExercises(Set<SongExercise> songExercises) { this.songExercises = songExercises; }
    public void addSongExercise(SongExercise exercise) { songExercises.add(exercise); }
    public void removeSongExercise(SongExercise exercise) { songExercises.remove(exercise); }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }
    public void addTag(Tag tag) { tags.add(tag); }
    public void removeTag(Tag tag) { tags.remove(tag); }
}
