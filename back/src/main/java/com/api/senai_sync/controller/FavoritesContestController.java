package com.api.senai_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.senai_sync.entity.Contest;
import com.api.senai_sync.exceptions.ContestFavoritesException;
import com.api.senai_sync.service.FavoritesContestService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/favoritos")
public class FavoritesContestController {

    @Autowired
    private FavoritesContestService favoritoConcursoService;

    @PostMapping("/adicionar")
    public ResponseEntity<?> addFavorites(@Valid @RequestBody Contest contest){ 
        try {
            return ResponseEntity.ok().body(favoritoConcursoService.createContestfavorites(contest));            
        } catch (ContestFavoritesException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }       
    }
    @GetMapping("/lista")
    public ResponseEntity<?> listFavorites(){
        return ResponseEntity.ok().body(favoritoConcursoService.listContestFavorites());
    }
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> deleteFavorites(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(favoritoConcursoService.deleteContestFavorites(id));
        } catch (ContestFavoritesException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }catch(BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }    
}
