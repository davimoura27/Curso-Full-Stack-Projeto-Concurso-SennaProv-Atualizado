package com.api.senai_sync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.senai_sync.entity.Contest;


public interface ContestRepository extends JpaRepository<Contest,Long> {
    Optional<Contest> findByLink(String link);
}
