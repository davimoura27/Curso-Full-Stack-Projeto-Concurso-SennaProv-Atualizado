package com.api.senai_sync.controller.dto;
import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
}

