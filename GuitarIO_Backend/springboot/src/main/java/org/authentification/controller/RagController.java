package org.authentification.controller;

import org.authentification.dto.RagRequest;
import org.authentification.dto.RagResponse;
import org.authentification.service.RagService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rag")
public class RagController {

    private final RagService ragService;

    public RagController(RagService ragService) {
        this.ragService = ragService;
    }

    @PostMapping("/ask")
    public ResponseEntity<RagResponse> ask(
            @RequestBody RagRequest request,
            Authentication auth
    ) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(ragService.askQuestion(userId, request));
    }
}
