package com.api.senai_sync.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class BlockNotes {

    @Id
    @GeneratedValue
    private Long id;
    
    @Column
    private String title;

    @Column
    @NotBlank
    private String text;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    protected void Criar(){
        this.createdAt = LocalDateTime.now();
    }
    protected void Atualizar(){
        this.updatedAt = LocalDateTime.now();
    }
}
