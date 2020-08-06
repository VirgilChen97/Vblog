package com.cyf.myblogserver.controller;

import com.cyf.myblogserver.data.ArticleResponse;
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

    /**
     * Post an new article with authenticated user
     * @param article article entity from request
     * @param request HttpServletRequest with authenticated user id
     * @return success message
     * @throws CommonException
     */
    @PostMapping("/articles")
    public ResponseData addArticle(@RequestBody Article article, HttpServletRequest request) throws CommonException {

        // User's id has been put in HttpServletRequest in JwtRequestFilter, non authenticated user will
        // be blocked by filter
        Long authenticatedUserId = (Long)request.getAttribute("userId");

        // put user id in article entity
        User user = new User();
        user.setId(authenticatedUserId);
        article.setUser(user);

        articleService.saveArticle(article);
        return ResponseData.success();
    }

    /**
     * Get a user's article by username, filtered by given parameters
     * @param page
     * @param limit
     * @param category return only the article with given category id
     * @param tag return only the article with given tag id
     * @param username
     * @return result
     * @throws CommonException
     */
    @GetMapping("/articles")
    public ResponseData<PagedArticleResponse> getArticles(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer limit,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) Long tag,
            String username
    ) throws CommonException {
        Page<Article> articles = articleService.getArticlesByUserName(page, limit, username, category, tag);
        PagedArticleResponse response = new PagedArticleResponse(articles);
        return ResponseData.success(response);
    }

    /**
     * Edit an article identified by articleId
     * @param id The id of the article that need to be edited
     * @param article Edited article entity from request body
     * @param request HttpServletRequest with authenticated user id
     * @return success message
     * @throws CommonException
     */
    @PutMapping("/articles/{id}")
    public ResponseData editArticle(@PathVariable Long id, @RequestBody Article article, HttpServletRequest request) throws CommonException {
        Long authenticatedUserId = (Long)request.getAttribute("userId");
        User user = new User();
        user.setId(authenticatedUserId);
        article.setUser(user);
        article.setId(id);
        articleService.editArticle(article);
        return ResponseData.success();
    }

    /**
     * Delete an article identified by articleId
     * @param id The id of the article that need to be deleted
     * @param request HttpServletRequest with authenticated user id
     * @return success message
     * @throws CommonException
     */
    @DeleteMapping("/articles/{id}")
    public ResponseData deleteArticle(@PathVariable Long id, HttpServletRequest request) throws CommonException {
        Long AuthenticatedUserId = (Long)request.getAttribute("userId");
        articleService.deleteArticle(id, AuthenticatedUserId);
        return ResponseData.success();
    }

    /**
     * Get an article identified by articleId
     * @param id
     * @return article data wrapped by response data
     * @throws CommonException
     */
    @GetMapping("/articles/{id}")
    public ResponseData<ArticleResponse> getArticle(@PathVariable Long id) throws CommonException {
        Article article = articleService.getArticle(id);
        ArticleResponse response = new ArticleResponse(article);
        return ResponseData.success(response);
    }
}
