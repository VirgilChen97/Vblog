package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.ImageUploadResponse;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.exception.Error;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@RestController
public class ImageController {
    @Value("${imagePath}")
    String imagePath;
    @Value("${serverAddr}")
    String serverAddr;

    @PostMapping("/api/images")
    public ImageUploadResponse imageUpload(@RequestParam("image") MultipartFile image) throws IOException {
        String filename = UUID.randomUUID().toString();
        File file = new File(imagePath + filename + ".png");
        image.transferTo(file);
        return new ImageUploadResponse("/images/" + filename + ".png");
    }

    @GetMapping(value = "/api/images/{imageName}", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getImage(@PathVariable String imageName) throws IOException, CommonException {
        File file = new File(imagePath + imageName);
        try {
            FileInputStream inputStream = new FileInputStream(file);
            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes, 0, inputStream.available());
            return bytes;
        } catch (IOException e){
            throw new CommonException(Error.IMAGE_NOT_FOUNT.getCode(), 404, Error.IMAGE_NOT_FOUNT.getMsg());
        }
    }
}
