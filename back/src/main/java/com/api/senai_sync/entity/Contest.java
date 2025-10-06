package com.api.senai_sync.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(of = "link")
public class Contest {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    @Column(unique = true)
    @NotBlank(message = "O link é obrigatorio")
    private String link;

    
}
