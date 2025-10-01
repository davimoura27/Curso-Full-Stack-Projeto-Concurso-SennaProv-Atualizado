package com.api.senai_sync.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.api.senai_sync.dto.UserResponseDto;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.exceptions.EmailExistenteException;
import com.api.senai_sync.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public UserResponseDto saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailExistenteException();
        }
        String encoderPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(encoderPassword);
        userRepository.save(user);
        return modelMapper.map(user, UserResponseDto.class);
    }
}

