package com.cyf.vblog.data;

import lombok.Data;

@Data
public class ResponseData<T> {
    private Integer code;
    private String msg;
    private T data;

    public static ResponseData success(){
        ResponseData responseData = new ResponseData();
        responseData.setCode(0);
        responseData.setMsg("success");
        return responseData;
    }

    public static <V> ResponseData<V> success(V data){
        ResponseData responseData = new ResponseData();
        responseData.setCode(0);
        responseData.setMsg("success");
        responseData.setData(data);
        return responseData;
    }
}
