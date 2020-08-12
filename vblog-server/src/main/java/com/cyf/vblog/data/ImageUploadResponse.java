package com.cyf.vblog.data;

import lombok.Data;

@Data
public class ImageUploadResponse {
    public ImageUploadResponse(String filename){
        this.imageUrl = filename;
    }
    String imageUrl;
}
