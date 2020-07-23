package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.PagedArticleResponse;
import com.cyf.myblogserver.entity.User;
import com.cyf.myblogserver.exception.AuthenticationFailedException;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.data.ResponseData;
import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api")
public class ArticleController {

    ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }
    
    @PostMapping("/articles")
    public ResponseData addArticle(@RequestBody Article article, HttpServletRequest request) {
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        User user = new User();
        user.setId(AuthenticatedUserId);
        article.setUser(user);
        articleService.saveArticle(article);
        return ResponseData.success();
    }

    @PutMapping("/articles/{id}")
    public ResponseData editArticle(@PathVariable Long id, @RequestBody Article article){
        article.setId(id);
        articleService.saveArticle(article);
        return ResponseData.success();
    }

    @DeleteMapping("/articles/{id}")
    public ResponseData deleteArticle(@PathVariable Long id, HttpServletRequest request) throws CommonException {
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        articleService.deleteArticle(id, AuthenticatedUserId);
        return ResponseData.success();
    }

    @GetMapping("/articles")
    public ResponseData<PagedArticleResponse> getArticles(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer limit,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long tagId,
            String username
    ) throws CommonException {
        Page<Article> articles = articleService.getArticlesByUserName(page, limit, username);
        PagedArticleResponse response = new PagedArticleResponse(
                articles.getContent(),
                articles.getPageable().getPageNumber(),
                articles.getPageable().getPageSize(),
                articles.getNumberOfElements(),
                articles.getTotalPages(),
                articles.getTotalElements()
        );
        return ResponseData.success(response);
    }

    @GetMapping("/articles/{id}")
    public ResponseData<Article> getArticle(@PathVariable Long id) throws CommonException {
        Article article = articleService.getArticle(id);
        return ResponseData.success(article);
    }
}
