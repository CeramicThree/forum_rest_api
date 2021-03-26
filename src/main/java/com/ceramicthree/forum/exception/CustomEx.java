package com.ceramicthree.forum.exception;

import org.springframework.mail.MailException;

public class CustomEx extends RuntimeException {
    public CustomEx(String ex) {
        super(ex);
    }
}
