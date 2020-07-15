package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.AuthenticationRequest;
import com.cyf.myblogserver.data.AuthenticationResponse;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.data.UserInfoResponse;
import com.cyf.myblogserver.entity.User;
import com.cyf.myblogserver.exception.AuthenticationFailedException;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.service.BlogUserDetailsService;
import com.cyf.myblogserver.service.TokenService;
import com.cyf.myblogserver.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    AuthenticationManager authenticationManager;
    TokenService tokenService;
    BlogUserDetailsService blogUserDetailsService;

    public UserController(AuthenticationManager authenticationManager, TokenService tokenService, BlogUserDetailsService blogUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.blogUserDetailsService = blogUserDetailsService;
    }

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    public ResponseData getToken(@RequestBody AuthenticationRequest request) throws AuthenticationFailedException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        }catch (BadCredentialsException e){
            throw new AuthenticationFailedException();
        }catch (Exception e){
            e.printStackTrace();
            throw new AuthenticationFailedException();
        }
        String token = "bearer;" + tokenService.getToken(request);
        AuthenticationResponse response = new AuthenticationResponse();
        response.setJwt(token);
        return ResponseData.success(response);
    }

    @RequestMapping(value = "/users/{username}")
    public ResponseData<UserInfoResponse> getUserInfoById (@PathVariable String username) throws CommonException {
        User user = blogUserDetailsService.getUserInfoByUsername(username);
        return ResponseData.success(new UserInfoResponse(user));
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseData register(@RequestBody User user) throws CommonException {
        User registeredUser = blogUserDetailsService.addNewUser(user);
        return ResponseData.success(registeredUser);
    }
}
