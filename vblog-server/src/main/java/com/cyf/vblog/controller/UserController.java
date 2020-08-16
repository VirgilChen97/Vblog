package com.cyf.vblog.controller;

import com.cyf.vblog.data.*;
import com.cyf.vblog.entity.User;
import com.cyf.vblog.exception.AuthenticationFailedException;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.service.BlogUserDetailsService;
import com.cyf.vblog.service.TokenService;
import com.cyf.vblog.service.UserService;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

    AuthenticationManager authenticationManager;
    TokenService tokenService;
    UserService userService;

    public UserController(AuthenticationManager authenticationManager, TokenService tokenService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userService = userService;
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
        User user = userService.getUserInfo(userId);
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
        User user = userService.getUserInfoByUsername(username);
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
        User registeredUser = userService.addNewUser(user);
        return ResponseData.success(new UserInfoResponse(registeredUser));
    }

    /**
     * Change user personal settings
     * @param userId
     * @param requestBody
     * @param request
     * @return
     * @throws AuthenticationFailedException
     */
    @RequestMapping(value = "/users/{userId}/personalSettings", method = RequestMethod.POST)
    public ResponseData changeUserPersonalSettings (
            @PathVariable(name = "userId") Long userId,
            @RequestBody ChangeUserPersonalSettingsRequest requestBody,
            HttpServletRequest request
    ) throws CommonException {
        // If the authenticated user tried to change other user's info
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        if(userId != AuthenticatedUserId){
            throw new CommonException(Error.PERMISSION_DENIED.getCode(), 403, Error.PERMISSION_DENIED.getMsg());
        }
        userService.changeUserPersonalSettings(userId, requestBody);
        return ResponseData.success();
    }

    @RequestMapping(value = "/users/{userId}/password", method = RequestMethod.POST)
    public ResponseData changeUserPassword(
            @PathVariable Long userId,
            @RequestBody ChangeUserPasswordRequest changeUserPasswordRequest,
            HttpServletRequest request
    ) throws CommonException {
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        if(userId != AuthenticatedUserId){
            throw new CommonException(Error.PERMISSION_DENIED.getCode(), 403, Error.PERMISSION_DENIED.getMsg());
        }
        userService.changeUserPassword(userId, changeUserPasswordRequest);
        return ResponseData.success();
    }

    @RequestMapping(value = "/users/{userId}/email", method = RequestMethod.POST)
    public ResponseData changeUserEmail(
            @PathVariable Long userId,
            @RequestBody ChangeUserEmailRequest changeUserEmailRequest,
            HttpServletRequest request
    ) throws CommonException {
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        if(userId != AuthenticatedUserId){
            throw new CommonException(Error.PERMISSION_DENIED.getCode(), 403, Error.PERMISSION_DENIED.getMsg());
        }
        userService.changeUserEmail(userId, changeUserEmailRequest.getEmail());
        return ResponseData.success();
    }

    @RequestMapping("/verify/{uuid}")
    public ResponseData verifyUserEmail(@PathVariable String uuid) throws CommonException {
        userService.verifyUserEmail(uuid);
        return ResponseData.success();
    }

    @RequestMapping(value = "/verify", method = RequestMethod.POST)
    public ResponseData sendVerificationEmail(HttpServletRequest request) throws CommonException {
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        userService.sendVerificationEmail(AuthenticatedUserId);
        return ResponseData.success();
    }
}
