package com.api.senai_sync.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.api.senai_sync.controller.dto.UserResponseDto;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.exceptions.EmailException;
import com.api.senai_sync.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private ModelMapper modelMapper = new ModelMapper();

    public UserResponseDto saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailException();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return modelMapper.map(user, UserResponseDto.class);
    }
}

