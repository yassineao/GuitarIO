package org.authentification.controller;

import org.authentification.entity.Tag;
import org.authentification.repository.TagRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tags")
public class TagController {

    private final TagRepository tagRepository;

    public TagController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @GetMapping
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTagById(@PathVariable Long id) {
        return tagRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Tag not found")));
    }

    @PostMapping
    public ResponseEntity<?> createTag(@RequestBody Tag tag) {
        if (tagRepository.findByName(tag.getName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Tag already exists"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(tagRepository.save(tag));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTag(@PathVariable Long id, @RequestBody Tag updatedTag) {
        return tagRepository.findById(id)
                .<ResponseEntity<?>>map(tag -> {
                    tag.setName(updatedTag.getName());
                    tag.setDescription(updatedTag.getDescription());
                    return ResponseEntity.ok(tagRepository.save(tag));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Tag not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable Long id) {
        if (!tagRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Tag not found"));
        }
        tagRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Tag deleted"));
    }
}
