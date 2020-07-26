package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ArticleResponse {
    private Long id;
    private String title;
    private int state;
    UserInfoResponse user;
    private List<Tag> tags;
    private Category category;
    private String mdContent;
    private Date createDate;
    private Date lastModifiedDate;

    public ArticleResponse(Article article){
        this.id = article.getId();
        this.title = article.getTitle();
        this.state = article.getState();
        this.user = new UserInfoResponse(article.getUser());
        this.tags = article.getTags();
        this.category = article.getCategory();
        this.mdContent = article.getMdContent();
        this.createDate = article.getCreateDate();
        this.lastModifiedDate = article.getLastModifiedDate();
    }
}
