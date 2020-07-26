package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.data.TagInfoResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TagCategoryControllerTest {

    @Autowired
    TagCategoryController tagCategoryController;

    @Test
    void getAllUserTags() {
        ResponseData<List<TagInfoResponse>> allUserTags = tagCategoryController.getAllUserTags(1L);
        System.out.println(allUserTags);
    }

    @Test
    void getAllUserCategories() {
    }
}