package com.cyf.vblog.service;

import com.cyf.vblog.data.ChangeUserSettingRequest;
import com.cyf.vblog.entity.User;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.regex.Pattern;

@Service
public class BlogUserDetailsService implements UserDetailsService {

    UserRepository userRepository;
    StringRedisTemplate redisTemplate;
    MailService mailService;

    @Autowired
    public BlogUserDetailsService(UserRepository userRepository, StringRedisTemplate redisTemplate, MailService mailService) {
        this.userRepository = userRepository;
        this.redisTemplate = redisTemplate;
        this.mailService = mailService;
    }

    /**
     * This method is used by spring security for user authentication.
     * @param username
     * @return org.springframework.security.core.userdetails.User
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(StringUtils.isEmpty(username)){
            throw new UsernameNotFoundException("User doesn't exist");
        }
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User doesn't exist");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    /**
     * Get user info by id
     * @param userId
     * @return User entity identified by id
     * @throws CommonException
     */
    public User getUserInfo(Long userId) throws CommonException {
        User user = userRepository.findById(userId).get();
        if(user == null){
            throw new CommonException(Error.USER_NOT_FOUNT.getCode(), 404, Error.USER_NOT_FOUNT.getMsg());
        }else{
            return user;
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
        User newUser = userRepository.save(user);
        return newUser;
    }

    public void changeUserInfo(Long userId, ChangeUserSettingRequest changeUserSettingRequest){
        User user = userRepository.findById(userId).get();
        user.setNickName(changeUserSettingRequest.getNickName());
        user.setLocation(changeUserSettingRequest.getLocation());
        user.setEmail(changeUserSettingRequest.getEmail());
        user.setBlogName(changeUserSettingRequest.getBlogName());
        user.setTitle(changeUserSettingRequest.getTitle());
        user.setImageUrl(changeUserSettingRequest.getImageUrl());
        userRepository.save(user);
    }

    /**
     * verify a user's email address
     * @param uuid
     */
    public void verifyUserEmail(String uuid) throws CommonException {
        String email = redisTemplate.opsForValue().get(uuid);
        if(email == null){
            throw new CommonException(Error.CODE_EXPIRED.getCode(), 404, Error.CODE_EXPIRED.getMsg());
        }

        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new CommonException(Error.CODE_EXPIRED.getCode(), 404, Error.CODE_EXPIRED.getMsg());
        }

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
        User user = userRepository.findById(userId).get();
        if(user.getEmailVerified()){
            throw new CommonException(Error.ALREADY_VERIFIED.getCode(), 409, Error.ALREADY_VERIFIED.getMsg());
        }
        mailService.sendVerificationEmail(user);
    }
}
