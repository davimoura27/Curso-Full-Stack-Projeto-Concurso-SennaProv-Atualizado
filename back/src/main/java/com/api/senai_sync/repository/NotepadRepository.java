package com.api.senai_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.senai_sync.entity.Notepad;

public interface NotepadRepository extends JpaRepository<Notepad,Long> {
    
}
