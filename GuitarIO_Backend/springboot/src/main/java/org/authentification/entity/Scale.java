package org.authentification.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "scales")
public class Scale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g., "Pentatonic Minor", "Dorian"

    @Column(nullable = false)
    private String root; // Root note (e.g., "C", "G")

    @Column(columnDefinition = "TEXT")
    private String pattern; // Interval pattern or notes

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String exercises; // JSON or text with example exercises

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel difficultyLevel = DifficultyLevel.BEGINNER;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "scale_tags",
            joinColumns = @JoinColumn(name = "scale_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public Scale() {}

    public Scale(String name, String root) {
        this.name = name;
        this.root = root;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRoot() { return root; }
    public void setRoot(String root) { this.root = root; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getExercises() { return exercises; }
    public void setExercises(String exercises) { this.exercises = exercises; }

    public DifficultyLevel getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }

    public void addTag(Tag tag) { tags.add(tag); }
    public void removeTag(Tag tag) { tags.remove(tag); }
}
