package com.api.senai_sync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.senai_sync.entity.Concurso;

public interface ConcursoRepository extends JpaRepository<Concurso,Long> {
    Optional<Concurso> findByLink(String link); 
}
