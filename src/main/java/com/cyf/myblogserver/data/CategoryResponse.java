package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Category;
import lombok.Data;

@Data
public class CategoryResponse {
    private Long id;
    private String categoryName;
    private Integer count;

    public CategoryResponse(Category category){
        this.id = category.getId();
        this.categoryName = category.getCategoryName();
        this.count = category.getCount();
    }
}
