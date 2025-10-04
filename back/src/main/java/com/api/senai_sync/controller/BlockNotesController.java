package com.api.senai_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.senai_sync.controller.dto.BlockNotesRequestDto;
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
    
}
