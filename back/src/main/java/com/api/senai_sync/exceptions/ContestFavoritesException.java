package com.api.senai_sync.exceptions;

public class ContestFavoritesException extends RuntimeException{
    public ContestFavoritesException(){
        super("Concurso ja registrado nos favoritos");
    }
    public ContestFavoritesException(String message){
        super(message);        
    }
}
