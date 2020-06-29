package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findByCountIsNot(0);
    }
}
