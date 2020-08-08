package com.cyf.vblog.component;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "audience")
@Data
public class Audience {
    private String iss;
    private String secret;
    private int expireSecond;
}
