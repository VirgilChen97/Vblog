package com.cyf.vblog.service;

import com.cyf.vblog.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class MailServiceTest {

    @Mock
    JavaMailSender javaMailSender;
    @Mock
    StringRedisTemplate stringRedisTemplate;
    @Mock
    ValueOperations<String, String> valueOperations;

    MailService mailService;

    @BeforeEach
    void init(){
        mailService = new MailService(javaMailSender, stringRedisTemplate);
    }

    @Test
    void sendVerificationEmail() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");
        user.setEmail("dummy@email.com");

        // First time send email
        when(stringRedisTemplate.opsForValue()).thenReturn(valueOperations);

        when(valueOperations.get(anyString())).thenReturn(null);
        mailService.sendVerificationEmail(user);
        ArgumentCaptor<String> uuidCaptor = ArgumentCaptor.forClass(String.class);
        verify(valueOperations, atLeastOnce()).set(anyString(),uuidCaptor.capture());
        ArgumentCaptor<SimpleMailMessage> mailCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(javaMailSender, times(1)).send(mailCaptor.capture());
        // verify the uuid stored in redis is the same as the uuid sent in the email
        assertEquals(true, mailCaptor.getValue().getText().contains(uuidCaptor.getValue()));

        // Send email when previous verification code is still valid
        when(valueOperations.get(anyString())).thenReturn("asd");
        mailService.sendVerificationEmail(user);
        verify(stringRedisTemplate, times(1)).delete("asd");
    }
}