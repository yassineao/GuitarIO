package org.authentification.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "song_exercises")
public class SongExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String songTitle;

    @Column
    private String artist;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String lyrics; // Optional: full lyrics

    @Column(columnDefinition = "TEXT")
    private String chordSequence; // e.g., "Am - Dm - G - C"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel difficultyLevel = DifficultyLevel.INTERMEDIATE;

    @Column
    private String musicGenre; // e.g., "Rock", "Pop", "Folk"

    @Column
    private String bpm;

    @Column(columnDefinition = "TEXT")
    private String strummingTips;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "exercise_chords",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "chord_id")
    )
    private Set<Chord> requiredChords = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "exercise_tags",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public SongExercise() {}

    public SongExercise(String songTitle, String artist) {
        this.songTitle = songTitle;
        this.artist = artist;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSongTitle() { return songTitle; }
    public void setSongTitle(String songTitle) { this.songTitle = songTitle; }

    public String getArtist() { return artist; }
    public void setArtist(String artist) { this.artist = artist; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLyrics() { return lyrics; }
    public void setLyrics(String lyrics) { this.lyrics = lyrics; }

    public String getChordSequence() { return chordSequence; }
    public void setChordSequence(String chordSequence) { this.chordSequence = chordSequence; }

    public DifficultyLevel getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public String getMusicGenre() { return musicGenre; }
    public void setMusicGenre(String musicGenre) { this.musicGenre = musicGenre; }

    public String getBpm() { return bpm; }
    public void setBpm(String bpm) { this.bpm = bpm; }

    public String getStrummingTips() { return strummingTips; }
    public void setStrummingTips(String strummingTips) { this.strummingTips = strummingTips; }

    public Set<Chord> getRequiredChords() { return requiredChords; }
    public void setRequiredChords(Set<Chord> requiredChords) { this.requiredChords = requiredChords; }

    public void addChord(Chord chord) { requiredChords.add(chord); }
    public void removeChord(Chord chord) { requiredChords.remove(chord); }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }

    public void addTag(Tag tag) { tags.add(tag); }
    public void removeTag(Tag tag) { tags.remove(tag); }
}
