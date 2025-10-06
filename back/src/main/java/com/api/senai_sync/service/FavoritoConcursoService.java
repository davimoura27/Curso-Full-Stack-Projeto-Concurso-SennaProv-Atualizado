package com.api.senai_sync.service;

import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.api.senai_sync.controller.dto.FavoritosResponseDto;
import com.api.senai_sync.entity.Concurso;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.exceptions.ConcursoFavoritoException;
import com.api.senai_sync.repository.ConcursoRepository;
import com.api.senai_sync.repository.UserRepository;

@Service
public class FavoritoConcursoService {
    
    @Autowired
    private ConcursoRepository concursoRepository;

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public FavoritosResponseDto createContestfavorites(Concurso concurso){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user = (UserDetails) authentication.getPrincipal();
        User userExistent = userRepository.findByEmail(user.getUsername()).get(); 

        Optional<Concurso> concursoExistent = concursoRepository.findByLink(concurso.getLink());        
    
        if (concursoExistent.isPresent()) {
           Concurso favorito = concursoExistent.get();        
            if(!userExistent.getFavoritos().contains(favorito)) {
                userExistent.getFavoritos().add(favorito);
                User userSave = userRepository.save(userExistent);
                FavoritosResponseDto favoritosResponseDto = modelMapper.map(userSave, FavoritosResponseDto.class);
                return favoritosResponseDto;
            }else{
                throw new ConcursoFavoritoException();
            }           
        }
        Concurso concursoNovo = new Concurso();
        concursoNovo.setName(concurso.getName());
        concursoNovo.setLink(concurso.getLink());
        
        concursoRepository.save(concursoNovo);
        userExistent.getFavoritos().add(concursoNovo);
        User user2 = userRepository.save(userExistent);
        return modelMapper.map(user2, FavoritosResponseDto.class);
    }
    
    public FavoritosResponseDto listConcursoFavorito(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user =(UserDetails) authentication.getPrincipal();
        User userExistent = userRepository.findByEmail(user.getUsername()).get();

        return modelMapper.map(userExistent, FavoritosResponseDto.class);
    }

    public FavoritosResponseDto deleteConcursoFavoritos(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user = (UserDetails) authentication.getPrincipal();
        User userExistente = userRepository.findByEmail(user.getUsername()).get();

        Concurso concurso = concursoRepository.findById(id).orElseThrow(
            () -> new ConcursoFavoritoException("Concurso não encontrao nos favoritos"));
        userExistente.getFavoritos().remove(concurso);
        User newUser = userRepository.save(userExistente);
        return modelMapper.map(newUser, FavoritosResponseDto.class);
    }
}
