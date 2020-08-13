package com.cyf.vblog.service;

import com.cyf.vblog.data.ChangeUserPasswordRequest;
import com.cyf.vblog.data.ChangeUserPersonalSettingsRequest;
import com.cyf.vblog.entity.User;
import com.cyf.vblog.entity.UserSettings;
import com.cyf.vblog.exception.AuthenticationFailedException;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.repository.UserRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    @Autowired
    public BlogUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
