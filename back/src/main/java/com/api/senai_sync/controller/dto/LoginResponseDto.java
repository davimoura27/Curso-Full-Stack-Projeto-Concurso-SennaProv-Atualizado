package com.api.senai_sync.controller.dto;
import lombok.Data;

@Data
public class LoginResponseDto {
   private String name;
   private String email;
   private String token;
}
