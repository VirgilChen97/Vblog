package com.cyf.myblogserver.data;

import com.cyf.myblogserver.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Data;

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
}
