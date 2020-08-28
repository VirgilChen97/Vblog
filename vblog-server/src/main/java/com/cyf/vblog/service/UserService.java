package com.cyf.vblog.service;

import com.cyf.vblog.data.ChangeUserPasswordRequest;
import com.cyf.vblog.data.ChangeUserPersonalSettingsRequest;
import com.cyf.vblog.entity.User;
import com.cyf.vblog.entity.UserSettings;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.regex.Pattern;

@Slf4j
@Service
public class UserService {
    StringRedisTemplate redisTemplate;
    MailService mailService;
    AuthenticationManager authenticationManager;
    UserRepository userRepository;

    public UserService(StringRedisTemplate redisTemplate, MailService mailService, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.redisTemplate = redisTemplate;
        this.mailService = mailService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    /**
     * Get user info by id
     * @param userId
     * @return User entity identified by id
     * @throws CommonException
     */
    public User getUserInfo(Long userId) throws CommonException {
        try {
            return userRepository.findById(userId).get();
        }catch (NoSuchElementException e){
            throw new CommonException(Error.USER_NOT_FOUNT.getCode(), 404, Error.USER_NOT_FOUNT.getMsg());
        }
    }

    /**
     * Get user info by username
     * @param username
     * @return User entity identified by username
     * @throws CommonException
     */
    public User getUserInfoByUsername(String username) throws CommonException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new CommonException(Error.USER_NOT_FOUNT.getCode(), 404, Error.USER_NOT_FOUNT.getMsg());
        }else{
            return user;
        }
    }

    /**
     * Register a new user to the system
     * @param user the user that need to be added
     * @return The added user
     * @throws CommonException
     */
    public User addNewUser(User user) throws CommonException {
        String emailPattern = "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$";
        String userNamePattern = "^[a-zA-Z0-9_-]{4,20}$";

        // Although the username and email has been validated at the frontend, but double check at backend
        // Check username, email and password format
        if(!Pattern.matches(emailPattern, user.getEmail())){
            throw new CommonException(Error.EMAIL_INVALID.getCode(), 400, Error.EMAIL_INVALID.getMsg());
        }
        if(!Pattern.matches(userNamePattern, user.getUsername())){
            throw new CommonException(Error.USERNAME_INVALID.getCode(), 400, Error.USERNAME_INVALID.getMsg());
        }
        if(user.getPassword().length() < 6){
            throw new CommonException(Error.PASSWORD_TOO_SHORT.getCode(), 400, Error.PASSWORD_TOO_SHORT.getMsg());
        }

        // Check whether the username or password already exist
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser != null){
            throw new CommonException(Error.USERNAME_ALREADY_USED.getCode(), 409, Error.USERNAME_ALREADY_USED.getMsg());
        }
        existUser = userRepository.findByEmail(user.getEmail());
        if(existUser != null){
            throw new CommonException(Error.EMAIL_ALREADY_USED.getCode(), 409, Error.EMAIL_ALREADY_USED.getMsg());
        }

        // All check passed, add user to database
        // Before adding, encrypt the password with bcrypt
        user.setPassword("{bcrypt}" + new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setUserSettings(new UserSettings());
        User newUser = userRepository.save(user);
        return newUser;
    }

    public void changeUserPersonalSettings(Long userId, ChangeUserPersonalSettingsRequest changeUserSettingRequest){
        User user = userRepository.findById(userId).get();
        UserSettings userSettings = user.getUserSettings();
        userSettings.setNickName(changeUserSettingRequest.getNickName());
        userSettings.setLocation(changeUserSettingRequest.getLocation());
        userSettings.setBlogName(changeUserSettingRequest.getBlogName());
        userSettings.setTitle(changeUserSettingRequest.getTitle());
        userSettings.setImageUrl(changeUserSettingRequest.getImageUrl());
        userRepository.save(user);
    }

    public void changeUserPassword(Long userId, ChangeUserPasswordRequest request) throws CommonException {
        User user = userRepository.findById(userId).get();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), request.getOldPassword())
            );
        }catch (BadCredentialsException e){
            throw new CommonException(Error.OLD_PASSWORD_NOT_CORRECT.getCode(), 403, Error.OLD_PASSWORD_NOT_CORRECT.getMsg());
        }

        if(request.getNewPassword() == null || request.getNewPassword().length() < 6){
            throw new CommonException(Error.PASSWORD_TOO_SHORT.getCode(), 400, Error.PASSWORD_TOO_SHORT.getMsg());
        }
        user.setPassword("{bcrypt}" + new BCryptPasswordEncoder().encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void changeUserEmail(Long userId, String newEmailAddr) throws CommonException {
        String emailPattern = "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$";
        if(!Pattern.matches(emailPattern, newEmailAddr)){
            throw new CommonException(Error.EMAIL_INVALID.getCode(), 400, Error.EMAIL_INVALID.getMsg());
        }

        User existUser = userRepository.findByEmail(newEmailAddr);
        if(existUser != null){
            throw new CommonException(Error.EMAIL_ALREADY_USED.getCode(), 409, Error.EMAIL_ALREADY_USED.getMsg());
        }

        User user = userRepository.findById(userId).get();
        if(newEmailAddr.equals(user.getEmail())){
            throw new CommonException(Error.EMAIL_ALREADY_USED.getCode(), 409, Error.EMAIL_ALREADY_USED.getMsg());
        }
        user.setEmail(newEmailAddr);
        user.setEmailVerified(false);
        userRepository.save(user);

        sendVerificationEmail(userId);
    }

    /**
     * verify a user's email address
     * @param uuid
     */
    public void verifyUserEmail(String uuid) throws CommonException {
        log.info("Start verify email address with uuid {}", uuid);

        String email = redisTemplate.opsForValue().get(uuid);
        if(email == null){
            throw new CommonException(Error.CODE_EXPIRED.getCode(), 404, Error.CODE_EXPIRED.getMsg());
        }

        log.info("Find email {} with uuid {}", email, uuid);
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new CommonException(Error.CODE_EXPIRED.getCode(), 404, Error.CODE_EXPIRED.getMsg());
        }
        log.info("Find user {} with uuid {}", user.getId(), uuid);

        user.setEmailVerified(true);
        userRepository.save(user);
        redisTemplate.delete(uuid);
        redisTemplate.delete(email);
    }

    /**
     * send verification email to given user
     * @param userId
     */
    public void sendVerificationEmail(Long userId) throws CommonException {
        log.info("User with id {} requested to send verification email", userId);
        User user = userRepository.findById(userId).get();
        if(user.getEmailVerified()){
            throw new CommonException(Error.ALREADY_VERIFIED.getCode(), 409, Error.ALREADY_VERIFIED.getMsg());
        }
        mailService.sendVerificationEmail(user);
    }
}
