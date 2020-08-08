package com.cyf.vblog.service;

import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class LocalImageService implements ImageService{


    @Value("${imagePath}")
    String imagePath;
    @Value("${serverAddr}")
    String serverAddr;

    @Override
    public String saveImage(MultipartFile image, Long userId) throws IOException {
        Path filePath = Paths.get(imagePath, String.valueOf(userId), image.getOriginalFilename());
        File file = new File(filePath.toString());

        int repeat = 1;
        while (file.exists()){
            String orgFileName = image.getOriginalFilename();
            String[] tokens = orgFileName.split("\\.(?=[^\\.]+$)");
            String newFileName = tokens[0] + '_' + repeat + "." + tokens[1];
            file = new File(Paths.get(imagePath, String.valueOf(userId), newFileName).toString());
            repeat ++;
        }

        file.getParentFile().mkdir();
        image.transferTo(file);
        return "/images/" + userId + "/" + file.getName();
    }

    @Override
    public byte[] getImage(String path) throws CommonException {
        File file = new File(imagePath + path);
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
