package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ArticleResponse {
    private Long id;
    private String title;
    private int state;
    UserInfoResponse user;
    private List<TagResponse> tags;
    private CategoryResponse category;
    private String mdContent;
    private Date createDate;
    private Date lastModifiedDate;

    public ArticleResponse(Article article){
        this.id = article.getId();
        this.title = article.getTitle();
        this.state = article.getState();
        this.user = new UserInfoResponse(article.getUser());
        if(article.getTags() != null) {
            List<TagResponse> tags = new ArrayList<>();
            for (Tag tag : article.getTags()) {
                tags.add(new TagResponse(tag));
            }
            this.tags = tags;
        }
        if(article.getCategory()!=null) {
            this.category = new CategoryResponse(article.getCategory());
        }
        this.mdContent = article.getMdContent();
        this.createDate = article.getCreateDate();
        this.lastModifiedDate = article.getLastModifiedDate();
    }
}
