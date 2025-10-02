package com.api.senai_sync.controller.dto;

import java.util.List;
import com.api.senai_sync.entity.Concurso;
import lombok.Data;

@Data
public class FavoritosResponseDto {
    private Long id;
    private String name;
    private String email;
    private List<Concurso> favoritos;
}
