package com.api.senai_sync.service;

import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.api.senai_sync.controller.dto.FavoritesResponseDto;
import com.api.senai_sync.entity.Contest;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.exceptions.ContestFavoritesException;
import com.api.senai_sync.repository.ContestRepository;
import com.api.senai_sync.repository.UserRepository;

@Service
public class FavoritesContestService {
    
    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public FavoritesResponseDto createContestfavorites(Contest contest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user = (UserDetails) authentication.getPrincipal();
        User userExisting = userRepository.findByEmail(user.getUsername()).get(); 

        Optional<Contest> contestExistent = contestRepository.findByLink(contest.getLink());        
    
        if (contestExistent.isPresent()) {
           Contest favorito = contestExistent.get();        
            if(!userExisting.getFavorites().contains(favorito)) {
                userExisting.getFavorites().add(favorito);
                User userSave = userRepository.save(userExisting);
                FavoritesResponseDto favoritosResponseDto = modelMapper.map(userSave, FavoritesResponseDto.class);
                return favoritosResponseDto;
            }else{
                throw new ContestFavoritesException();
            }           
        }
        Contest newContest = new Contest();
        newContest.setName(contest.getName());
        newContest.setLink(contest.getLink());
        
        contestRepository.save(newContest);
        userExisting.getFavorites().add(newContest);
        User newUser = userRepository.save(userExisting);
        return modelMapper.map(newUser, FavoritesResponseDto.class);
    }
    
    public FavoritesResponseDto listContestFavorites(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user =(UserDetails) authentication.getPrincipal();
        User userExisting = userRepository.findByEmail(user.getUsername()).get();

        return modelMapper.map(userExisting, FavoritesResponseDto.class);
    }

    public FavoritesResponseDto deleteContestFavorites(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user = (UserDetails) authentication.getPrincipal();
        User userExisting = userRepository.findByEmail(user.getUsername()).get();

        Contest contest = contestRepository.findById(id).orElseThrow(
            () -> new ContestFavoritesException("Concurso não encontrao nos favoritos"));
        userExisting.getFavorites().remove(contest);
        User newUser = userRepository.save(userExisting);
        return modelMapper.map(newUser, FavoritesResponseDto.class);
    }
}
