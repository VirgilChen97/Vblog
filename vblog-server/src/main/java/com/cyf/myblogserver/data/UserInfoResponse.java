package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResponse {

    public UserInfoResponse(User user){
        this.id = user.getId();
        this.username = user.getUsername();
        this.nickName = user.getNickName();
        this.title = user.getTitle();
        this.location = user.getLocation();
        this.blogName = user.getBlogName();
        this.email = user.getEmail();
    }

    Long id;
    String username;
    String nickName;
    String blogName;
    String title;
    String location;
    String email;
}
