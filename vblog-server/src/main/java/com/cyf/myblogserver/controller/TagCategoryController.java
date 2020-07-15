package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.CategoryResponse;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.data.TagResponse;
import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.service.TagCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api")
@RestController
public class TagCategoryController {

    TagCategoryService tagCategoryService;

    @Autowired
    public TagCategoryController(TagCategoryService tagCategoryService) {
        this.tagCategoryService = tagCategoryService;
    }

    @RequestMapping("/tags")
    public ResponseData<List<TagResponse>> getAllUserTags(@RequestParam Long userId){
        List<Tag> tags = tagCategoryService.getAllUserTags(userId);
        List<TagResponse> tagResponses = new ArrayList<>();
        for(Tag tag:tags){
            tagResponses.add(new TagResponse(tag));
        }
        return ResponseData.success(tagResponses);
    }

    @RequestMapping("/categories")
    public ResponseData<List<CategoryResponse>> getAllUserCategories(@RequestParam Long userId){
        List<Category> categories = tagCategoryService.getAllUserCategories(userId);
        List<CategoryResponse> categoryResponses = new ArrayList<>();
        for(Category category:categories){
            categoryResponses.add(new CategoryResponse(category));
        }
        return ResponseData.success(categoryResponses);
    }
}
