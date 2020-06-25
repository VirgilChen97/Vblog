package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.Exception.CommonException;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ArticleController {

    ArticleService articleService;
    Logger logger = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/article")
    public ResponseData addArticle(@RequestBody Article article) throws CommonException {
        Map<String, Long> responseMap = new HashMap<>();
        Long articleId = articleService.saveArticle(article);
        return ResponseData.success();
    }

    @GetMapping("/article")
    public ResponseData<Page<Article>> getArticles(@RequestParam Integer page, @RequestParam Integer limit){
        Page<Article> articles = articleService.getArticles(page, limit);
        return ResponseData.success(articles);
    }

    @GetMapping("/article/{id}")
    public ResponseData<Article> getArticle(@PathVariable Long id) throws CommonException {
        Article article = articleService.getArticle(id);
        return ResponseData.success(article);
    }
}
