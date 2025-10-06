package com.api.senai_sync.exceptions;

public class EmailException extends RuntimeException {
    public EmailException(){
        super("Email ja cadastrado!");
    }
    public EmailException(String message){
        super(message);
    }
}
