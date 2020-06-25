package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
    public Map<String, Long> addArticle(@RequestBody Article article){
        Map<String, Long> responseMap = new HashMap<>();
        Long articleId = articleService.saveArticle(article);
        if(articleId == null){
            responseMap.put("articleId", null);
        }else{
            responseMap.put("articleId", articleId);
        }
        return responseMap;
    }

    @GetMapping("/article")
    public Page<Article> getArticles(@RequestParam Integer page, @RequestParam Integer limit){
        Page<Article> articles = articleService.getArticles(page, limit);
        return articles;
    }
}
