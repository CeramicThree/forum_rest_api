package com.ceramicthree.forum.exception;

import org.springframework.mail.MailException;

public class CustomMailEx extends RuntimeException {
    public CustomMailEx(String ex) {
        super(ex);
    }
}
