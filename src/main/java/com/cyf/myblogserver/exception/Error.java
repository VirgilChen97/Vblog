package com.cyf.myblogserver.exception;

public enum Error{
    USER_NOT_FOUNT(40401, "User does not exist"),
    ARTICLE_NOT_FOUND(40402, "Article does not exist"),
    EMAIL_ALREADY_USED(40901, "This email address has already been used"),
    USERNAME_ALREADY_USED(40902, "This username has already been used")

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
