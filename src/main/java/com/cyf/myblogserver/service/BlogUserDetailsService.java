package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.User;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.exception.Error;
import com.cyf.myblogserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
public class BlogUserDetailsService implements UserDetailsService {

    UserRepository userRepository;

    @Autowired
    public BlogUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

    public User getUserInfoByUsername(String username) throws CommonException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new CommonException(Error.USER_NOT_FOUNT.getCode(), 404, Error.USER_NOT_FOUNT.getMsg());
        }else{
            return user;
        }
    }

    public User addNewUser(User user) throws CommonException {
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser != null){
            throw new CommonException(Error.USERNAME_ALREADY_USED.getCode(), 409, Error.USERNAME_ALREADY_USED.getMsg());
        }
        existUser = userRepository.findByEmail(user.getEmail());
        if(existUser != null){
            throw new CommonException(Error.EMAIL_ALREADY_USED.getCode(), 409, Error.EMAIL_ALREADY_USED.getMsg());
        }
        user.setPassword("{bcrypt}" + new BCryptPasswordEncoder().encode(user.getPassword()));
        User newUser = userRepository.save(user);
        return newUser;
    }
}
