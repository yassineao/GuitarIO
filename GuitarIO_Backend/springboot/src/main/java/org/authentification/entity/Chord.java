package org.authentification.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "chords")
public class Chord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g., "C Major", "G Minor"

    @Column(nullable = false)
    private String notation; // e.g., "Cmaj", "Gm"

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String fingeringPattern; // Visual representation or notes

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel difficultyLevel = DifficultyLevel.BEGINNER;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "chord_tags",
            joinColumns = @JoinColumn(name = "chord_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public Chord() {}

    public Chord(String name, String notation) {
        this.name = name;
        this.notation = notation;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNotation() { return notation; }
    public void setNotation(String notation) { this.notation = notation; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFingeringPattern() { return fingeringPattern; }
    public void setFingeringPattern(String fingeringPattern) { this.fingeringPattern = fingeringPattern; }

    public DifficultyLevel getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }

    public void addTag(Tag tag) { tags.add(tag); }
    public void removeTag(Tag tag) { tags.remove(tag); }
}
