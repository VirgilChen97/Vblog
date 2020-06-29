package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TagServiceTest {

    @Autowired
    TagService tagService;

    @Test
    void getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        for(Tag tag: tags){
            assertNotEquals(0, tag.getId());
        }
    }
}