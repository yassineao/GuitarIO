package org.authentification.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class StatusController {

    @GetMapping({"/", "/health"})
    public Map<String, String> status() {
        return Map.of("status", "ok");
    }
}