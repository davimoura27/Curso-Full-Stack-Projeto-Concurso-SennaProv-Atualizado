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
import com.api.senai_sync.controller.dto.NotepadRequestDto;
import com.api.senai_sync.controller.dto.NotepadResponseDto;
import com.api.senai_sync.entity.Notepad;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.exceptions.NotepadExceptions;
import com.api.senai_sync.repository.NotepadRepository;
import com.api.senai_sync.repository.UserRepository;

@Service
public class NotepadService {

    @Autowired
    private NotepadRepository notepadRepository;

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public NotepadResponseDto createNotepad(NotepadRequestDto notepadRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        Notepad newNotepad = new Notepad();
        newNotepad.setTitle(notepadRequestDto.getTitle());
        newNotepad.setText(notepadRequestDto.getText());
        newNotepad.setUser(user);
        newNotepad.setCreatedAt(LocalDate.now());

        Notepad notepad = notepadRepository.save(newNotepad);
        user.getNotes().add(notepad);
        return modelMapper.map(notepad, NotepadResponseDto.class);
    }

    public List<NotepadResponseDto> listNotepads(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        List<Notepad> listNotepads = user.getNotes();
        List<NotepadResponseDto> listNotesDto = new ArrayList<>();

        for (Notepad notepad : listNotepads) {
            NotepadResponseDto newListNotesUser = modelMapper.map(notepad, NotepadResponseDto.class);
            listNotesDto.add(newListNotesUser);
        }
        return listNotesDto;
    }

    public List<NotepadResponseDto> deleteNotepad(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        Notepad notepad = notepadRepository.findById(id)
        .orElseThrow(() -> new NotepadExceptions("Anotação não encontrada!"));
        List<Notepad> listNotepads = user.getNotes();

        if (!notepad.getUser().equals(user)) {
            throw new NotepadExceptions("Anotação não encontrada ou não pertence ao usuario!");
        }
        listNotepads.remove(notepad);
        notepadRepository.delete(notepad); 
        userRepository.save(user);    
       
        List<NotepadResponseDto> newListNotesUser = new ArrayList<>();
        
        for (Notepad newNotepad : listNotepads) {            
            NotepadResponseDto notepadResponseDto = modelMapper.map(newNotepad, NotepadResponseDto.class);
            newListNotesUser.add(notepadResponseDto);
        }
        return newListNotesUser;
    } 

    public NotepadResponseDto updateNotepad(Long id, NotepadRequestDto notepadRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userAuth = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userAuth.getUsername()).get();

        Notepad notepad = notepadRepository.findById(id)
            .orElseThrow(() -> new NotepadExceptions("Anotação não encontrada"));
            
        if (user.getNotes().contains(notepad)) {
            notepad.setTitle(notepadRequestDto.getTitle());
            notepad.setText(notepadRequestDto.getText());
            notepad.setUpdatedAt(LocalDate.now());
            notepadRepository.save(notepad);
        }else{
            throw new NotepadExceptions("Anotação não encontrada ou não pertence ao usuario!");
        }
        return modelMapper.map(notepad, NotepadResponseDto.class); 
    }   
}
