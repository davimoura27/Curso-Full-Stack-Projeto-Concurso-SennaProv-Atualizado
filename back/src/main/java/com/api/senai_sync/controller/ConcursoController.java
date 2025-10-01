package com.api.senai_sync.controller;

import com.api.senai_sync.service.ConcursoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/concursos")
@CrossOrigin(origins = "http://localhost:3001")
public class ConcursoController {

    private final ConcursoService concursoService;

    public ConcursoController(ConcursoService concursoService) {
        this.concursoService = concursoService;
    }

    @GetMapping
    public List<Map<String, String>> getConcursos(@RequestParam String uf) {
        return concursoService.fetchConcursosByUf(uf); 
    }
}
