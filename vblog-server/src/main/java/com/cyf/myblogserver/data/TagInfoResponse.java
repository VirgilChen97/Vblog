package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.entity.User;
import lombok.Data;

@Data
public class TagInfoResponse {
    private Long id;
    private Long userId;
    private String tagName;
    private Integer count;

    public TagInfoResponse(Tag tag, Integer count){
        this.id = tag.getId();
        this.userId = tag.getUser().getId();
        this.tagName = tag.getTagName();
        this.count = count;
    }
}
