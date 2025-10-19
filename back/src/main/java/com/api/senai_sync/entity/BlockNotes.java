package com.api.senai_sync.entity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class BlockNotes {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;
    
    @Column
    private String title;

    @Column
    @NotBlank
    private String text;

    @Column
    private LocalDate createdAt;

    @Column
    private LocalDate updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    protected void Criar(){
        this.createdAt = LocalDate.now();
    }
    protected void Atualizar(){
        this.updatedAt = LocalDate.now();
    }
}
