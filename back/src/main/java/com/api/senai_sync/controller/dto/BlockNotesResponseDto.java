package com.api.senai_sync.controller.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BlockNotesResponseDto {
    private Long id;
    private String title;
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    
}
