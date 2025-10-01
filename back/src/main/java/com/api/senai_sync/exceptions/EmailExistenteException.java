package com.api.senai_sync.exceptions;

public class EmailExistenteException extends RuntimeException {
    public EmailExistenteException(){
        super("Email ja cadastrado!");
    }
    public EmailExistenteException(String message){
        super(message);
    }
}
