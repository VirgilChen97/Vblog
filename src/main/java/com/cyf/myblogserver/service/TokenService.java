package com.cyf.myblogserver.service;

import com.cyf.myblogserver.component.Audience;
import com.cyf.myblogserver.data.AuthenticationRequest;
import com.cyf.myblogserver.entity.User;
import com.cyf.myblogserver.repository.UserRepository;
import com.cyf.myblogserver.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    UserRepository userRepository;
    Audience audience;

    public TokenService(UserRepository userRepository, Audience audience) {
        this.userRepository = userRepository;
        this.audience = audience;
    }

    public String getToken(AuthenticationRequest request){
        User user = userRepository.findByUsername(request.getUsername());
        return JwtUtil.createJWT(user.getUsername(), user.getId(),
                audience.getIss(), audience.getExpireSecond()*1000, audience.getSecret());
    }
}
