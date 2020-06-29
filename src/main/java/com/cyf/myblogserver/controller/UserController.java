package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.AuthenticationRequest;
import com.cyf.myblogserver.data.AuthenticationResponse;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.exception.AuthenticationFailedException;
import com.cyf.myblogserver.service.BlogUserDetailsService;
import com.cyf.myblogserver.service.TokenService;
import com.cyf.myblogserver.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    AuthenticationManager authenticationManager;
    TokenService tokenService;

    @Autowired
    public UserController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @RequestMapping(value = "/api/token", method = RequestMethod.POST)
    public ResponseData getToken(@RequestBody AuthenticationRequest request) throws AuthenticationFailedException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        }catch (BadCredentialsException e){
            throw new AuthenticationFailedException();
        }
        String token = "bearer;" + tokenService.getToken(request);
        AuthenticationResponse response = new AuthenticationResponse();
        response.setJwt(token);
        return ResponseData.success(response);
    }
}
