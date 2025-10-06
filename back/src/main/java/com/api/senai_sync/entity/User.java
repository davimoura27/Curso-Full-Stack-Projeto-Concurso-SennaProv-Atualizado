package com.api.senai_sync.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    @NotBlank(message = "O campo nome deve ser preenchido")
    private String name;

    @Column
    @NotNull(message = "O campo idade deve ser preenchido")
    private int age;

    @Column
    @NotBlank
    @Pattern(regexp = "^\\d{11}$"
    ,message = "O telefone deve conter 11 digitos numericos incluindo DDD")
    private String telephone;

    @Column(unique = true)
    @Email(message = "Formato de email invalido")
    private String email;

    @Column
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=]).{8,}$",
    message = "A senha deve conter pelo menos 1 numero, 1 letra, 1 caracter e 8 digitos")
    private String password;

    @ManyToMany
    @JoinTable(name = "user_favoritos",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "concurso_id"))
    private List<Contest> favorites;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BlockNotes> notes;
}
