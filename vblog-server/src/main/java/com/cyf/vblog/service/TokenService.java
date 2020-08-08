package com.cyf.vblog.service;

import com.cyf.vblog.component.Audience;
import com.cyf.vblog.data.AuthenticationRequest;
import com.cyf.vblog.entity.User;
import com.cyf.vblog.repository.UserRepository;
import com.cyf.vblog.util.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    UserRepository userRepository;
    Audience audience;

    public TokenService(UserRepository userRepository, Audience audience) {
        this.userRepository = userRepository;
        this.audience = audience;
    }

    /**
     * Generate a new token for the given user
     * @param request
     * @return A new JWT
     */
    public String getToken(AuthenticationRequest request){
        User user = userRepository.findByUsername(request.getUsername());
        return JwtUtil.createJWT(user.getUsername(), user.getId(),
                audience.getIss(), audience.getExpireSecond()*1000, audience.getSecret());
    }
}
