package com.cyf.vblog.data;

import com.cyf.vblog.entity.Tag;
import lombok.Data;

@Data
public class TagResponse {
    private Long id;
    private Long userId;
    private String tagName;

    public TagResponse(Tag tag){
        this.id = tag.getId();
        this.userId = tag.getUser().getId();
        this.tagName = tag.getTagName();
    }
}
