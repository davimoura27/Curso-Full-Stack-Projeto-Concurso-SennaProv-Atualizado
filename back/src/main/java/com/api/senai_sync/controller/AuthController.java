package com.api.senai_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import com.api.senai_sync.controller.dto.LoginRequestDto;
import com.api.senai_sync.service.LoginService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {


   @Autowired
   private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
       
    try {
        return ResponseEntity.ok().body(loginService.authService(loginRequestDto));
    } catch (BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credencial incorreta ou usuario não registrado");
    }
    }
}
