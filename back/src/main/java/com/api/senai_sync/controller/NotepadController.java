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
import com.api.senai_sync.controller.dto.NotepadRequestDto;
import com.api.senai_sync.exceptions.NotepadExceptions;
import com.api.senai_sync.service.NotepadService;

@RestController
@RequestMapping("/notas")
public class NotepadController {

    @Autowired
    private NotepadService notepadService;

    @PostMapping("/adicionar")
    public ResponseEntity<?> addNotepad(@RequestBody NotepadRequestDto notepadRequestDto){
        return ResponseEntity.ok().body(notepadService.createNotepad(notepadRequestDto));
    }

    @GetMapping("/lista")
    public ResponseEntity<?> listNotepads(){
        return ResponseEntity.ok().body(notepadService.listNotepads());
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> deleteNotepad(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(notepadService.deleteNotepad(id));            
        } catch (NotepadExceptions e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> updateNotepad(@PathVariable Long id, @RequestBody NotepadRequestDto notepadRequestDto){
        try {
            return ResponseEntity.ok().body(notepadService.updateNotepad(id, notepadRequestDto));
        } catch (NotepadExceptions e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }    
}
