package com.cyf.myblogserver.component;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@Component
public class BlogErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", webRequest.getAttribute("msg", RequestAttributes.SCOPE_REQUEST));
        map.put("code", webRequest.getAttribute("code", RequestAttributes.SCOPE_REQUEST));
        return map;
    }
}
