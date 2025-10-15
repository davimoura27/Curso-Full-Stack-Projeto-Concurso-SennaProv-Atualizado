package com.api.senai_sync.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.api.senai_sync.config.JwtUtil;
import com.api.senai_sync.controller.dto.LoginRequestDto;
import com.api.senai_sync.controller.dto.LoginResponseDto;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.repository.UserRepository;

@Service
public class LoginService {

    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponseDto authService(LoginRequestDto loginRequestDTO){
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(),
            loginRequestDTO.getPassword());
        authenticationManager.authenticate(authentication);

        String token = jwtUtil.generateToken(loginRequestDTO.getEmail());
        User user = userRepository.findByEmail(loginRequestDTO.getEmail()).get();

        LoginResponseDto loginResponseDto = modelMapper.map(user, LoginResponseDto.class);
        loginResponseDto.setToken(token);
        return loginResponseDto;
    }
    
}
