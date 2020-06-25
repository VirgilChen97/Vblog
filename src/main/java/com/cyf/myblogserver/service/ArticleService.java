package com.cyf.myblogserver.service;

import org.slf4j.Logger; // 调用slf4j接口
import org.slf4j.LoggerFactory;
import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    ArticleRepository articleRepository;
    Logger logger = LoggerFactory.getLogger(ArticleService.class);

    @Autowired
    public ArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    public Long saveArticle(Article article){
        Article article1 = articleRepository.save(article);
        return article1.getId();
    }

    public Page<Article> getArticles(int page, int limit){
        Sort sort = Sort.by(Sort.Direction.DESC, "createDate");
        Pageable pageable = PageRequest.of(page, limit, sort);
        Page<Article> articles = articleRepository.findByState(pageable, Article.PUBLISHED);
        return articles;
    }
}
