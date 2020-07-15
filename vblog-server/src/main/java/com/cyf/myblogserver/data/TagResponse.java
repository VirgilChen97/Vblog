package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Tag;
import lombok.Value;

@Value
public class TagResponse {
    private Long id;
    private String tagName;
    private Integer count;

    public TagResponse(Tag tag){
        this.id = tag.getId();
        this.tagName = tag.getTagName();
        this.count = tag.getCount();
    }
}
