package com.api.senai_sync.service;

import java.time.LocalDateTime;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.api.senai_sync.controller.dto.BlockNotesRequestDto;
import com.api.senai_sync.controller.dto.BlockNotesRespondeDto;
import com.api.senai_sync.entity.BlockNotes;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.repository.BlockNotesRepository;
import com.api.senai_sync.repository.UserRepository;

@Service
public class BlockNotesService {

    @Autowired
    private BlockNotesRepository blockNotesRepository;

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public BlockNotesRespondeDto createBlockNote(BlockNotesRequestDto blockNotesRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        BlockNotes newBlock = new BlockNotes();
        newBlock.setTitle(blockNotesRequestDto.getTitle());
        newBlock.setText(blockNotesRequestDto.getText());
        newBlock.setUser(user);
        newBlock.setCreatedAt(LocalDateTime.now());
        newBlock.setUpdatedAt(LocalDateTime.now());

        BlockNotes blockNotes = blockNotesRepository.save(newBlock);
        user.getNotes().add(blockNotes);
        return modelMapper.map(blockNotes, BlockNotesRespondeDto.class);
    }
    
}
