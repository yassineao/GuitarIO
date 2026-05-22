package org.authentification.dto;

import java.util.List;

public record RagResponse(
        String answer,
        List<RagSource> sources,
        boolean grounded,
        Double retrievalQuality,
        String notice
) {
    public record RagSource(
            Long id,
            String title,
            String chapter,
            Integer number,
            String description,
            Double relevanceScore
    ) {}
}
