package com.cyf.myblogserver.data;

import lombok.Data;

@Data
public class ChangeUserSettingRequest {
    String nickName;
    String blogName;
    String location;
    String title;
    String email;
}
