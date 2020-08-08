package com.cyf.vblog.data;

import lombok.Data;

@Data
public class ChangeUserSettingRequest {
    String nickName;
    String blogName;
    String location;
    String title;
    String email;
    String imageUrl;
}
