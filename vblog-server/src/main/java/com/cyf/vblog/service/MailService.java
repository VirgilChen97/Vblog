package com.cyf.vblog.service;

import com.cyf.vblog.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class MailService {

    @Value("${serverAddr}")
    private String serverAddr;

    private JavaMailSender javaMailSender;
    private StringRedisTemplate redisTemplate;

    @Autowired
    public MailService(JavaMailSender javaMailSender, StringRedisTemplate redisTemplate) {
        this.javaMailSender = javaMailSender;
        this.redisTemplate = redisTemplate;
    }

    public void sendVerificationEmail(User user){
        log.info("Start send user {} with id {}, email {} verification email", user.getUsername(), user.getId(), user.getEmail());
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(user.getEmail());
        msg.setSubject("Verification Code for Vblog");

        // Generate an random uuid for verification
        UUID uuid = UUID.randomUUID();

        // Find whether there is a verification email sent before
        String lastUuid = redisTemplate.opsForValue().get(user.getEmail());
        if(lastUuid != null){
            // make previous uuid invalid
            redisTemplate.delete(lastUuid);
        }

        redisTemplate.opsForValue().set(uuid.toString(), user.getEmail());
        redisTemplate.expire(uuid.toString(), 24, TimeUnit.HOURS);
        redisTemplate.opsForValue().set(user.getEmail(), uuid.toString());
        redisTemplate.expire(user.getEmail(), 24, TimeUnit.HOURS);

        msg.setText("Click the following link to activate your account \n" + serverAddr + "/api/verify/" + uuid);
        javaMailSender.send(msg);
        log.info("Successfully send verification eamil to user {} with id {}, email {}", user.getUsername(), user.getId(), user.getEmail());
    }
}
