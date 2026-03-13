package org.authentification.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    // 🔗 one lesson -> many user-lesson relations
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserLesson> userLessons = new ArrayList<>();

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

    public void setId(Long id) { this.id = id; }
    public void setChapter(String chapter) { this.chapter = chapter; }
    public void setNumber(Integer number) { this.number = number; }
    public void setContent(String content) { this.content = content; }
}
