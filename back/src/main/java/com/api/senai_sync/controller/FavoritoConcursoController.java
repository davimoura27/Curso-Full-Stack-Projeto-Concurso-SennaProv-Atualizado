package com.api.senai_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.senai_sync.entity.Concurso;
import com.api.senai_sync.exceptions.ConcursoFavoritoException;
import com.api.senai_sync.service.FavoritoConcursoService;

@RestController
@RequestMapping("/favoritos")
public class FavoritoConcursoController {

    @Autowired
    private FavoritoConcursoService favoritoConcursoService;

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarFavoritos(@RequestBody Concurso concurso){ 
        try {
            return ResponseEntity.ok().body(favoritoConcursoService.createConcursofavorito(concurso));            
        } catch (ConcursoFavoritoException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }       
    }
    @GetMapping("/lista")
    public ResponseEntity<?> listaFavoritos(){
        return ResponseEntity.ok().body(favoritoConcursoService.listConcursoFavorito());
    }
    @DeleteMapping("/remove")
    public ResponseEntity<?> deleteFavorito(@RequestParam("link") String link){
        try {
            return ResponseEntity.ok().body(favoritoConcursoService.deleteConcursoFavoritos(link));
        } catch (ConcursoFavoritoException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }    
}
