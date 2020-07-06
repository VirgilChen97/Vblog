package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.repository.CategoryRepository;
import com.cyf.myblogserver.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TagCategoryServiceTest {

    @Autowired
    TagRepository tagRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Test
    void getAllUserTags() {
        List<Tag> tags = tagRepository.findByUserId(2l);
        assertEquals(tags.size(), 1);
    }

    @Test
    void getAllUserCategories() {
        List<Category> categories = categoryRepository.findByUserId(2l);
        assertEquals(categories.size(), 1);
    }
}