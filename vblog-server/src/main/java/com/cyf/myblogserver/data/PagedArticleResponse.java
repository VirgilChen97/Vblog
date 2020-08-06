package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class PagedArticleResponse {
    List<ArticleResponse> content;
    int pageNumber;
    int limit;
    int numberOfElements;
    int totalPages;
    Long totalElements;

    public PagedArticleResponse (Page<Article> articles){
        List<ArticleResponse> articleResponses = new ArrayList<>();
        for(Article article: articles.getContent()){
            articleResponses.add(new ArticleResponse(article));
        }
        this.content = articleResponses;
        this.pageNumber = articles.getPageable().getPageNumber();
        this.limit = articles.getPageable().getPageSize();
        this.numberOfElements = articles.getNumberOfElements();
        this.totalPages = articles.getTotalPages();
        this.totalElements = articles.getTotalElements();
    }
}
