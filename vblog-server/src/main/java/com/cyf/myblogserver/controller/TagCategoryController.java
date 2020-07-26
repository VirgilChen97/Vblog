package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.CategoryInfoResponse;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.data.TagInfoResponse;
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

    /**
     * Get all tags of an user identified by user id
     * @param userId
     * @return TagInfoResponse wrapped by response data
     */
    @RequestMapping("/tags")
    public ResponseData<List<TagInfoResponse>> getAllUserTags(@RequestParam Long userId){
        // Get all the user tags (no count)
        List<Tag> tags = tagCategoryService.getAllUserTags(userId);
        List<TagInfoResponse> tagResponses = new ArrayList<>();

        for(Tag tag:tags){
            // Iterate all the tags and their count
            Integer count = tagCategoryService.getTagCount(tag.getId());
            if(count > 0) {
                // only return the tags that has count more than 0
                tagResponses.add(new TagInfoResponse(tag, count));
            }
        }
        return ResponseData.success(tagResponses);
    }

    /**
     * Get all categories of an user identified by user id
     * @param userId
     * @return CategoryInfoResponse wrapped by response data
     */
    @RequestMapping("/categories")
    public ResponseData<List<CategoryInfoResponse>> getAllUserCategories(@RequestParam Long userId){
        List<Category> categories = tagCategoryService.getAllUserCategories(userId);
        List<CategoryInfoResponse> categoryResponses = new ArrayList<>();
        for(Category category:categories){
            Integer count = tagCategoryService.getCategoryCount(category.getId());
            if(count > 0) {
                categoryResponses.add(new CategoryInfoResponse(category, count));
            }
        }
        return ResponseData.success(categoryResponses);
    }
}
