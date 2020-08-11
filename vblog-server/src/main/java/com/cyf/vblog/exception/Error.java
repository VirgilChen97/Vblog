package com.cyf.vblog.exception;

public enum Error{
    USER_NOT_FOUNT(40401, "User does not exist"),
    ARTICLE_NOT_FOUND(40402, "Article does not exist"),
    IMAGE_NOT_FOUNT(40403, "Image does not exist"),
    CODE_EXPIRED(40404, "This verification code is expired"),
    TAG_NOT_FOUND(40405, "Tag does not exist"),
    CATEGORY_NOT_FOUND(40406, "Category does not exit"),
    EMAIL_ALREADY_USED(40901, "This email address has already been used"),
    USERNAME_ALREADY_USED(40902, "This username has already been used"),
    USERNAME_INVALID(40000, "This username is not valid, username should be within 6-20 characters, - or _"),
    EMAIL_INVALID(40001, "This email is not valid"),
    PASSWORD_TOO_SHORT(40002, "Password must be longer than 6 digit"),
    PERMISSION_DENIED(40301, "You don't have proper permission for this operation"),
    OLD_PASSWORD_NOT_CORRECT(40302, "Old password is not correct"),
    ALREADY_VERIFIED(40901, "User's email address is already verified")
    ;

    private String msg;
    private Integer code;

    Error(Integer code, String msg) {
        this.msg = msg;
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
