package com.baidu.appwalle;

public class SignatureNotFoundException extends Exception {
    private static final long serialVersionUID = 1L;

    public SignatureNotFoundException(String message) {
        super(message);
    }
}