package com.cyf.myblogserver.component;

import com.cyf.myblogserver.service.BlogUserDetailsService;
import com.cyf.myblogserver.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.hibernate.annotations.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    Audience audience;
    @Autowired
    BlogUserDetailsService blogUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = httpServletRequest.getHeader("Authorization");
        Claims claims = null;
        String token = null;
        if(authHeader != null && authHeader.startsWith("bearer;")){
            token = authHeader.substring(7);
            claims = JwtUtil.parseJWT(token,audience.getSecret());
        }
        if(claims != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = blogUserDetailsService.loadUserByUsername(claims.get("username", String.class));
            if(JwtUtil.validateJWT(token, userDetails, audience.getSecret())){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
