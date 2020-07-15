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
        this.displayName = user.getDisplayName();
        this.title = user.getTitle();
        this.location = user.getLocation();
    }

    Long id;
    String username;
    String displayName;
    String title;
    String location;
}
