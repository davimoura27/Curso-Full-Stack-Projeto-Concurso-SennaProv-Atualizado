package com.api.senai_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.senai_sync.entity.BlockNotes;

public interface BlockNotesRepository extends JpaRepository<BlockNotes,Long> {
    
}
