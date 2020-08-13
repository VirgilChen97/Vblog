package com.cyf.vblog.data;

import lombok.Data;

@Data
public class ChangeUserPasswordRequest {
    String oldPassword;
    String newPassword;
}
