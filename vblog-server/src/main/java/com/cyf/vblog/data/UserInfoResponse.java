package com.cyf.vblog.data;

import com.cyf.vblog.entity.User;
import com.cyf.vblog.entity.UserSettings;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResponse {

    public UserInfoResponse(User user){
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.userSettings = user.getUserSettings();
        this.emailVerified = user.getEmailVerified();
    }

    Long id;
    String username;
    String email;
    UserSettings userSettings;
    Boolean emailVerified;
}
