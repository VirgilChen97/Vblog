package com.cyf.vblog.service;

import com.cyf.vblog.component.Audience;
import com.cyf.vblog.data.AuthenticationRequest;
import com.cyf.vblog.repository.UserRepository;
import com.cyf.vblog.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class TokenServiceTest {

    @Mock
    UserRepository userRepository;
    @Mock
    Audience audience;

    TokenService tokenService;

    @BeforeEach
    void init(){
        audience.setSecret("dGVzdA==");
        audience.setExpireSecond(20);
        audience.setIss("test");
        tokenService = new TokenService(userRepository, audience);
    }

    @Test
    void getToken() {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("testuser");
        request.setPassword("123456");
        tokenService.getToken(request);
        verify(userRepository, times(1)).findByUsername("testuser");
    }
}