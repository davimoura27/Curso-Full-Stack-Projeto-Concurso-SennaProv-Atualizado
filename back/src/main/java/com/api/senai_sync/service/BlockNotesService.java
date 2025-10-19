package com.api.senai_sync.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.api.senai_sync.controller.dto.BlockNotesRequestDto;
import com.api.senai_sync.controller.dto.BlockNotesResponseDto;
import com.api.senai_sync.entity.BlockNotes;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.exceptions.BlockNotesExceptions;
import com.api.senai_sync.repository.BlockNotesRepository;
import com.api.senai_sync.repository.UserRepository;

@Service
public class BlockNotesService {

    @Autowired
    private BlockNotesRepository blockNotesRepository;

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public BlockNotesResponseDto createBlockNote(BlockNotesRequestDto blockNotesRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        BlockNotes newBlock = new BlockNotes();
        newBlock.setTitle(blockNotesRequestDto.getTitle());
        newBlock.setText(blockNotesRequestDto.getText());
        newBlock.setUser(user);
        newBlock.setCreatedAt(LocalDate.now());

        BlockNotes blockNotes = blockNotesRepository.save(newBlock);
        user.getNotes().add(blockNotes);
        return modelMapper.map(blockNotes, BlockNotesResponseDto.class);
    }

    public List<BlockNotesResponseDto> listBlockNote(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        List<BlockNotes> listNote = user.getNotes();
        List<BlockNotesResponseDto> listNotesDto = new ArrayList<>();

        for (BlockNotes blockNotes : listNote) {
            BlockNotesResponseDto newListNotesUser = modelMapper.map(blockNotes, BlockNotesResponseDto.class);
            listNotesDto.add(newListNotesUser);
        }
        return listNotesDto;
    }

    public List<BlockNotesResponseDto> deleteBlockNote(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        BlockNotes blockNotes = blockNotesRepository.findById(id)
        .orElseThrow(() -> new BlockNotesExceptions("Anotação não encontrada!"));
        List<BlockNotes> listNotes = user.getNotes();

        if (!blockNotes.getUser().equals(user)) {
            throw new BlockNotesExceptions("Anotação não encontrada ou não pertence ao usuario!");
        }
        listNotes.remove(blockNotes);
        blockNotesRepository.delete(blockNotes); 
        userRepository.save(user);    
       
        List<BlockNotesResponseDto> newListNotesUser = new ArrayList<>();
        
        for (BlockNotes newBlockNotes : listNotes) {            
            BlockNotesResponseDto blockNotesRespondeDto = modelMapper.map(newBlockNotes, BlockNotesResponseDto.class);
            newListNotesUser.add(blockNotesRespondeDto);
        }
        return newListNotesUser;
    } 

    public BlockNotesResponseDto updateBlockNotes(Long id, BlockNotesRequestDto blockNotesRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        BlockNotes blockNotes = blockNotesRepository.findById(id)
            .orElseThrow(() -> new BlockNotesExceptions("Anotação não encontrada"));
            
        if (user.getNotes().contains(blockNotes)) {
            blockNotes.setTitle(blockNotesRequestDto.getTitle());
            blockNotes.setText(blockNotesRequestDto.getText());
            blockNotes.setUpdatedAt(LocalDate.now());
            blockNotesRepository.save(blockNotes);
        }else{
            throw new BlockNotesExceptions("Anotação não encontrada ou não pertence ao usuario!");
        }
        return modelMapper.map(blockNotes, BlockNotesResponseDto.class); 
    }   
}
