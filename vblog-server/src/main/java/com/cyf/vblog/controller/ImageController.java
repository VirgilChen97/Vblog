package com.cyf.vblog.controller;

import com.cyf.vblog.data.ImageUploadResponse;
import com.cyf.vblog.data.ResponseData;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class ImageController {

    ImageService LocalImageService;

    @Autowired
    public ImageController(ImageService localImageService) {
        LocalImageService = localImageService;
    }

    @PostMapping("/api/images")
    public ResponseData<ImageUploadResponse> imageUpload(
            @RequestParam("image") MultipartFile image,
            HttpServletRequest request
    ) throws IOException {
        Long authenticatedUserId = (Long)request.getAttribute("userId");
        String res = LocalImageService.saveImage(image, authenticatedUserId);
        return ResponseData.success(new ImageUploadResponse(res));
    }

    @GetMapping(value = "/api/images/{userId}/{imageName}", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getImage(@PathVariable String imageName, @PathVariable Long userId) throws CommonException {
        String imagePath = "/" + userId + '/' + imageName;
        return LocalImageService.getImage(imagePath);
    }
}
