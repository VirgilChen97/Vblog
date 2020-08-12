package com.cyf.vblog.data;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}
