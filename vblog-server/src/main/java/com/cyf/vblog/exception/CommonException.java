package com.cyf.vblog.exception;

import lombok.Getter;

@Getter
public class CommonException extends Exception{
    private int internalCode;
    private int responseCode;
    private String msg;
    public CommonException(int internalCode, int responseCode, String msg) {
        super(msg);
        this.internalCode = internalCode;
        this.responseCode = responseCode;
        this.msg = msg;
    }
}
