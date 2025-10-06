package com.api.senai_sync.controller.dto;

import java.util.List;
import com.api.senai_sync.entity.Contest;
import lombok.Data;

@Data
public class FavoritesResponseDto {
    private Long id;
    private String name;
    private String email;
    private List<Contest> favorites;
}
