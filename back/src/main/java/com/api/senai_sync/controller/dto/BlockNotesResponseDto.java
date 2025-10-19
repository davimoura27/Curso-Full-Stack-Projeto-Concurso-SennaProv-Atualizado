package com.api.senai_sync.controller.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BlockNotesResponseDto {
    private Long id;
    private String title;
    private String text;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate createdAt;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate updatedAt;    
}
