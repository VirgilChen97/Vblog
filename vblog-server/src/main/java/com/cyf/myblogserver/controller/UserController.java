package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.*;
import com.cyf.myblogserver.entity.User;
import com.cyf.myblogserver.exception.AuthenticationFailedException;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.service.BlogUserDetailsService;
import com.cyf.myblogserver.service.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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

    /**
     * Request a token with username and password
     * @param request AuthenticationRequest, contains username and password
     * @return AuthenticationResponse, contains new JWT
     * @throws AuthenticationFailedException
     */
    @RequestMapping(value = "/token", method = RequestMethod.POST)
    public ResponseData getToken(@RequestBody AuthenticationRequest request) throws AuthenticationFailedException {
        // authenticate given username and password
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

        // JWT specified the token should start with bearer
        String token = "bearer;" + tokenService.getToken(request);
        AuthenticationResponse response = new AuthenticationResponse();
        response.setJwt(token);
        return ResponseData.success(response);
    }

    /**
     * Get a user's info by id
     * @param userId
     * @return
     * @throws CommonException
     */
    @RequestMapping(value = "/users/{userId}")
    public ResponseData<UserInfoResponse> getUserInfoById (@PathVariable Long userId) throws CommonException {
        User user = blogUserDetailsService.getUserInfo(userId);
        // Because user contains hashed version of password and other data, convert with UserInfoResponse
        return ResponseData.success(new UserInfoResponse(user));
    }

    /**
     * Get a user's info by username
     * @param username
     * @return
     * @throws CommonException
     */
    @RequestMapping(value = "/users")
    public ResponseData<UserInfoResponse> getUserInfoById (@RequestParam String username) throws CommonException {
        User user = blogUserDetailsService.getUserInfoByUsername(username);
        return ResponseData.success(new UserInfoResponse(user));
    }

    /**
     * Create a new user
     * @param user new user's user info from request body
     * @return new user's info
     * @throws CommonException
     */
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseData register(@RequestBody User user) throws CommonException {
        User registeredUser = blogUserDetailsService.addNewUser(user);
        return ResponseData.success(registeredUser);
    }

    /**
     * Change user settings
     * @param userId
     * @param requestBody
     * @param request
     * @return
     * @throws AuthenticationFailedException
     */
    @RequestMapping(value = "/users/{userId}", method = RequestMethod.POST)
    public ResponseData changeUserSettings (
            @PathVariable Long userId,
            @RequestBody ChangeUserSettingRequest requestBody,
            HttpServletRequest request
    ) throws AuthenticationFailedException {
        // If the authenticated user tried to change other user's info
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        if(userId != AuthenticatedUserId){
            throw new AuthenticationFailedException();
        }
        blogUserDetailsService.changeUserInfo(userId, requestBody);
        return ResponseData.success();
    }
}
