package com.api.senai_sync.controller;

import com.api.senai_sync.service.ContestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/concursos")
public class ContestController {

    private final ContestService concursoService;

    public ContestController(ContestService concursoService) {
        this.concursoService = concursoService;
    }

    @GetMapping
    public List<Map<String, String>> getConcursos(@RequestParam String uf) {
        return concursoService.fetchConcursosByUf(uf); 
    }
}
