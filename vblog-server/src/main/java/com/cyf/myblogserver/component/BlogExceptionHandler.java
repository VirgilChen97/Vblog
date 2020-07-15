package com.cyf.myblogserver.component;

import com.cyf.myblogserver.exception.AuthenticationFailedException;
import com.cyf.myblogserver.exception.CommonException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class BlogExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public String handleBasicException(CommonException e, HttpServletRequest request){
        Map<String, Object> map = new HashMap<>();
        request.setAttribute("javax.servlet.error.status_code", e.getResponseCode());
        request.setAttribute("code", e.getInternalCode());
        request.setAttribute("msg", e.getMsg());
        return "forward:/error";
    }

    @ExceptionHandler(AuthenticationFailedException.class)
    public String handleAuthenticationException(AuthenticationFailedException e, HttpServletRequest request){
        request.setAttribute("javax.servlet.error.status_code", 403);
        request.setAttribute("code", -1);
        request.setAttribute("msg", "认证失败");
        return "forward:/error";
    }

    @ExceptionHandler(Exception.class)
    public String handleException(Exception e, HttpServletRequest request){
        Map<String, Object> map = new HashMap<>();
        request.setAttribute("javax.servlet.error.status_code", 500);
        request.setAttribute("code", 500);
        request.setAttribute("msg", e.getMessage());
        e.printStackTrace();
        return "forward:/error";
    }
}
