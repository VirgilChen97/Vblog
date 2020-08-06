package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Category;
import lombok.Data;

@Data
public class CategoryResponse {
    private Long id;
    private Long userId;
    private String categoryName;

    public CategoryResponse(Category category){
        this.id = category.getId();
        this.userId = category.getUser().getId();
        this.categoryName = category.getCategoryName();
    }
}
