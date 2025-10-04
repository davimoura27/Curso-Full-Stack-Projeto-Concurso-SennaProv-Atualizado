package com.api.senai_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.senai_sync.entity.Concurso;
import com.api.senai_sync.exceptions.ConcursoFavoritoException;
import com.api.senai_sync.service.FavoritoConcursoService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/favoritos")
public class FavoritoConcursoController {

    @Autowired
    private FavoritoConcursoService favoritoConcursoService;

    @PostMapping("/adicionar")
    public ResponseEntity<?> addFavorites(@Valid @RequestBody Concurso concurso){ 
        try {
            return ResponseEntity.ok().body(favoritoConcursoService.createContestfavorites(concurso));            
        } catch (ConcursoFavoritoException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }       
    }
    @GetMapping("/lista")
    public ResponseEntity<?> listFavorites(){
        return ResponseEntity.ok().body(favoritoConcursoService.listConcursoFavorito());
    }
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> deleteFavorites(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(favoritoConcursoService.deleteConcursoFavoritos(id));
        } catch (ConcursoFavoritoException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }catch(BadCredentialsException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }    
}
