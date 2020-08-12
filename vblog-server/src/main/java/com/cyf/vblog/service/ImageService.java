package com.cyf.vblog.service;

import com.cyf.vblog.exception.CommonException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String saveImage(MultipartFile image, Long userId) throws IOException;
    byte[] getImage(String path) throws CommonException;
}
