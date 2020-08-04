package com.cyf.myblogserver.service;

import com.cyf.myblogserver.exception.CommonException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String saveImage(MultipartFile image, Long userId) throws IOException;
    byte[] getImage(String path) throws CommonException;
}
