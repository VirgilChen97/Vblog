package com.cyf.vblog.data;

import lombok.Data;

@Data
public class ChangeUserPersonalSettingsRequest {
    String nickName;
    String blogName;
    String location;
    String title;
    String imageUrl;
}
