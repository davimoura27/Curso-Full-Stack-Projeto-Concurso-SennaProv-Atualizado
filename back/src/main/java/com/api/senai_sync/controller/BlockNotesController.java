package com.api.senai_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.senai_sync.controller.dto.BlockNotesRequestDto;
import com.api.senai_sync.exceptions.BlockNotesExceptions;
import com.api.senai_sync.service.BlockNotesService;

@RestController
@RequestMapping("/notas")
public class BlockNotesController {

    @Autowired
    private BlockNotesService blockNotesService;

    @PostMapping("/adicionar")
    public ResponseEntity<?> addBlockNotes(@RequestBody BlockNotesRequestDto blockNotesRequestDto){
        return ResponseEntity.ok().body(blockNotesService.createBlockNote(blockNotesRequestDto));
    }

    @GetMapping("/lista")
    public ResponseEntity<?> listBlockNotes(){
        return ResponseEntity.ok().body(blockNotesService.listBlockNote());
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> deleteBlockNotes(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(blockNotesService.deleteBlockNote(id));            
        } catch (BlockNotesExceptions e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> updateBlockNotes(@PathVariable Long id, @RequestBody BlockNotesRequestDto blockNotesRequestDto){
        try {
            return ResponseEntity.ok().body(blockNotesService.updateBlockNotes(id, blockNotesRequestDto));
        } catch (BlockNotesExceptions e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    
}
