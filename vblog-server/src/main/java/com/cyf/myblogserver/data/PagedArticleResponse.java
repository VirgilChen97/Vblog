package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
public class PagedArticleResponse {
    List<Article> content;
    int pageNumber;
    int limit;
    int numberOfElements;
    int totalPages;
    Long totalElements;

    public PagedArticleResponse (Page<Article> articles){
        this.content = articles.getContent();
        this.pageNumber = articles.getPageable().getPageNumber();
        this.limit = articles.getPageable().getPageSize();
        this.numberOfElements = articles.getNumberOfElements();
        this.totalPages = articles.getTotalPages();
        this.totalElements = articles.getTotalElements();
    }
}
