package org.authentification.dto;

import java.util.List;

public record RagResponse(
        String answer,
        List<RagSource> sources
) {
    public record RagSource(
            Long id,
            String title,
            String chapter,
            Integer number,
            String description
    ) {}
}
