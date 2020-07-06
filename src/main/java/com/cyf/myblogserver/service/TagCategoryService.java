package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.repository.CategoryRepository;
import com.cyf.myblogserver.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagCategoryService {
    TagRepository tagRepository;
    CategoryRepository categoryRepository;

    @Autowired
    public TagCategoryService(TagRepository tagRepository, CategoryRepository categoryRepository) {
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Tag> getAllUserTags(Long userId){
        return tagRepository.findByUserId(userId);
    }

    public List<Category> getAllUserCategories(Long userId){
        return categoryRepository.findByUserId(userId);
    }
}
