package com.cyf.vblog.service;

import com.cyf.vblog.entity.User;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    StringRedisTemplate redisTemplate;
    @Mock
    MailService mailService;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    UserRepository userRepository;

    UserService userService;

    @BeforeEach
    void init(){
        userService = new UserService(redisTemplate, mailService, authenticationManager, userRepository);
    }

    @Test
    void getUserInfo() throws CommonException {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        User res = userService.getUserInfo(1L);
        assertEquals(res.getId(), user.getId());

        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        CommonException e = assertThrows(CommonException.class, ()->{userService.getUserInfo(1L);});
        assertEquals(e.getInternalCode(), Error.USER_NOT_FOUNT.getCode());
    }

    @Test
    void getUserInfoByUsername() throws CommonException {
        User user = new User();
        user.setUsername("test");
        when(userRepository.findByUsername(anyString())).thenReturn(user);
        User res = userService.getUserInfoByUsername("test");
        assertEquals(res.getUsername(), user.getUsername());

        when(userRepository.findByUsername(anyString())).thenReturn(null);
        CommonException e = assertThrows(CommonException.class, ()->{userService.getUserInfoByUsername("test");});
        assertEquals(e.getInternalCode(), Error.USER_NOT_FOUNT.getCode());
    }

    @Test
    void addNewUser() {
    }

    @Test
    void changeUserPersonalSettings() {
    }

    @Test
    void changeUserPassword() {
    }

    @Test
    void changeUserEmail() {
    }

    @Test
    void verifyUserEmail() {
    }

    @Test
    void sendVerificationEmail() {
    }
}