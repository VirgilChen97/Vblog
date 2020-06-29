package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ArticleController {

    ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // Upload an article
    @PostMapping("/articles")
    public ResponseData addArticle(@RequestBody Article article){
        Long articleId = articleService.saveArticle(article);
        return ResponseData.success();
    }

    @PutMapping("/articles/{id}")
    public ResponseData editArticle(@PathVariable Long id, @RequestBody Article article){
        article.setId(id);
        articleService.saveArticle(article);
        return ResponseData.success();
    }

    @GetMapping("/articles")
    public ResponseData<Page<Article>> getArticles(@RequestParam(defaultValue = "0") Integer page,
                                                   @RequestParam(defaultValue = "10") Integer limit){
        Page<Article> articles = articleService.getArticles(page, limit);
        return ResponseData.success(articles);
    }

    @GetMapping("/articles/{id}")
    public ResponseData<Article> getArticle(@PathVariable Long id) throws CommonException {
        Article article = articleService.getArticle(id);
        return ResponseData.success(article);
    }
}
