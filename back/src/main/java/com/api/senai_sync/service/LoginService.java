package com.api.senai_sync.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.api.senai_sync.config.JwtUtil;
import com.api.senai_sync.dto.LoginRequestDTO;
import com.api.senai_sync.dto.LoginResponseDto;

@Service
public class LoginService {

    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponseDto authService(LoginRequestDTO loginRequestDTO){
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(),
            loginRequestDTO.getPassword());
        authenticationManager.authenticate(authentication);

        String token = jwtUtil.generateToken(loginRequestDTO.getEmail());

        LoginResponseDto loginResponseDto = modelMapper.map(loginRequestDTO, LoginResponseDto.class);
        loginResponseDto.setToken(token);
        return loginResponseDto;
    }
    
}
