package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.exception.Error;
import com.cyf.myblogserver.repository.CategoryRepository;
import com.cyf.myblogserver.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public Category getCategory(Long categoryId) throws CommonException {
        try {
            return categoryRepository.findById(categoryId).get();
        } catch (NoSuchElementException e) {
            throw new CommonException(Error.CATEGORY_NOT_FOUND.getCode(), 404, Error.CATEGORY_NOT_FOUND.getMsg());
        }
    }

    public Tag getTag(Long tagId) throws CommonException {
        try {
            return tagRepository.findById(tagId).get();
        } catch (NoSuchElementException e) {
            throw new CommonException(Error.TAG_NOT_FOUND.getCode(), 404, Error.TAG_NOT_FOUND.getMsg());
        }
    }

    public Integer getTagCount(Long id){
        return tagRepository.getTagCount(id);
    }

    public Integer getCategoryCount(Long id){
        return categoryRepository.getCategoryCount(id);
    }
}
