package com.api.senai_sync.exceptions;

public class ConcursoFavoritoException extends RuntimeException{
    public ConcursoFavoritoException(){
        super("Concurso ja registrado nos favoritos");
    }
    public ConcursoFavoritoException(String message){
        super(message);        
    }
}
