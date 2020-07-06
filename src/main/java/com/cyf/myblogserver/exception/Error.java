package com.cyf.myblogserver.exception;

public enum Error{
    USER_NOT_FOUNT(40401, "User does not exist"),

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
