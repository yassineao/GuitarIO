package org.authentification.service;

import org.authentification.entity.Tag;
import org.authentification.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }

    public Tag createTag(Tag tag) {
        if (tagRepository.findByName(tag.getName()).isPresent()) {
            throw new IllegalArgumentException("Tag already exists");
        }
        return tagRepository.save(tag);
    }

    public Tag updateTag(Long id, Tag updatedTag) {
        return tagRepository.findById(id)
                .map(tag -> {
                    tag.setName(updatedTag.getName());
                    tag.setDescription(updatedTag.getDescription());
                    return tagRepository.save(tag);
                })
                .orElseThrow(() -> new IllegalArgumentException("Tag not found"));
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
