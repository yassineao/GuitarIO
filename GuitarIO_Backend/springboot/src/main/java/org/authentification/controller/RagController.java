package org.authentification.controller;

import org.authentification.dto.RagRequest;
import org.authentification.dto.RagResponse;
import org.authentification.service.RagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/rag")
public class RagController {

    private final RagService ragService;

    public RagController(RagService ragService) {
        this.ragService = ragService;
    }

    @PostMapping("/ask")
    public ResponseEntity<?> ask(
            @RequestBody RagRequest request,
            Authentication auth
    ) {
        try {
            Long userId = (Long) auth.getPrincipal();
            return ResponseEntity.ok(ragService.askQuestion(userId, request));
        } catch (ResponseStatusException ex) {
            return ResponseEntity
                    .status(ex.getStatusCode())
                    .body(error("RAG_REQUEST", ex.getReason(), ex));
        } catch (Exception ex) {
            boolean unauthorized = containsIgnoreCase(ex.getMessage(), "401")
                    || containsIgnoreCase(ex.getMessage(), "unauthorized")
                    || containsIgnoreCase(rootMessage(ex), "401")
                    || containsIgnoreCase(rootMessage(ex), "unauthorized");

            if (unauthorized) {
                return ResponseEntity
                        .status(HttpStatus.BAD_GATEWAY)
                        .body(Map.of(
                                "error", "DOWNSTREAM_AI_UNAUTHORIZED",
                                "message", "The RAG endpoint was reached, but the AI provider rejected the configured API key.",
                                "hint", "Check GEMINI_API_KEY, then restart the backend.",
                                "exception", ex.getClass().getSimpleName(),
                                "rootCause", rootMessage(ex)
                        ));
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error("RAG_INTERNAL_ERROR", "RAG failed after authentication succeeded.", ex));
        }
    }

    @PostMapping("/lessons/{lessonId}/embed")
    public ResponseEntity<?> embedLesson(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(Map.of(
                    "message", "Lesson embedding generated successfully.",
                    "lesson", ragService.embedLesson(lessonId)
            ));
        } catch (ResponseStatusException ex) {
            return ResponseEntity
                    .status(ex.getStatusCode())
                    .body(error("LESSON_EMBEDDING_REQUEST", ex.getReason(), ex));
        } catch (Exception ex) {
            boolean unauthorized = containsIgnoreCase(ex.getMessage(), "401")
                    || containsIgnoreCase(ex.getMessage(), "unauthorized")
                    || containsIgnoreCase(rootMessage(ex), "401")
                    || containsIgnoreCase(rootMessage(ex), "unauthorized");

            if (unauthorized) {
                return ResponseEntity
                        .status(HttpStatus.BAD_GATEWAY)
                        .body(Map.of(
                                "error", "DOWNSTREAM_AI_UNAUTHORIZED",
                                "message", "The embedding endpoint was reached, but the AI provider rejected the configured API key.",
                                "hint", "Check GEMINI_API_KEY, then restart the backend.",
                                "exception", ex.getClass().getSimpleName(),
                                "rootCause", rootMessage(ex)
                        ));
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error("LESSON_EMBEDDING_INTERNAL_ERROR", "Lesson embedding failed after authentication succeeded.", ex));
        }
    }

    private Map<String, String> error(String code, String message, Exception ex) {
        return Map.of(
                "error", code,
                "message", message == null || message.isBlank() ? "No error message was provided." : message,
                "exception", ex.getClass().getSimpleName(),
                "rootCause", rootMessage(ex)
        );
    }

    private String rootMessage(Throwable throwable) {
        Throwable root = throwable;
        while (root.getCause() != null) {
            root = root.getCause();
        }

        String message = root.getMessage();
        return message == null || message.isBlank()
                ? root.getClass().getSimpleName()
                : message;
    }

    private boolean containsIgnoreCase(String value, String needle) {
        return value != null && value.toLowerCase().contains(needle.toLowerCase());
    }
}
