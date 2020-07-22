package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.entity.User;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.exception.Error;
import com.cyf.myblogserver.repository.CategoryRepository;
import com.cyf.myblogserver.repository.TagRepository;
import com.cyf.myblogserver.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
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

import java.util.NoSuchElementException;

@Slf4j
@Service
public class ArticleService {

    ArticleRepository articleRepository;
    TagRepository tagRepository;
    CategoryRepository categoryRepository;
    UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, TagRepository tagRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save given article to database, while updating the tag and category
     * @param article The article need to be saved
     * @return Id if saved article
     */
    public Long saveArticle(Article article){

        // Go through all tags in the article

        User user = article.getUser();

        if(article.getTags() != null) {
            log.info("Article with tags {}", article.getTags());
            for (Tag tag : article.getTags()) {
                Tag existingTag = tagRepository.findByTagNameAndUserId(tag.getTagName(), user.getId());

                if (existingTag == null) {
                    tag.setUser(user);
                    // If the tag doesn't exist, create the tag
                    tagRepository.save(tag);
                } else {

                    // If exist, replace the id and increase the tag count int the db
                    tag.setId(existingTag.getId());
                    tagRepository.increaseTagCount(tag.getId());
                }
            }
        }

        if(article.getCategory()!=null) {
            // Check the article's category
            log.info("Article with category {}", article.getCategory());

            // Check whether the category exist
            Category existingCategory = categoryRepository.findByCategoryNameAndUserId(article.getCategory().getCategoryName(), user.getId());
            if (existingCategory == null) {
                article.getCategory().setUser(user);
                // If not, then create the tag;
                categoryRepository.save(article.getCategory());
            } else {

                // If exist, replace the id and increase the category count int the db
                article.getCategory().setId(existingCategory.getId());
                categoryRepository.increaseCategoryCount(article.getCategory().getId());
            }
        }

        // save the article and return its id;
        Article article1 = articleRepository.save(article);
        log.info("Article saved with id {}", article1.getId());
        return article1.getId();
    }

    public void deleteArticle(Long id, Long userId) throws CommonException {
        try {
            Article article = articleRepository.findById(id).get();
            if(article.getUser().getId() != userId){
                throw new CommonException(Error.PERMISSION_DENIED.getCode(), 403, Error.PERMISSION_DENIED.getMsg());
            }
            articleRepository.deleteById(id);
        } catch (NoSuchElementException e){
            throw new CommonException(Error.ARTICLE_NOT_FOUND.getCode(), 404, Error.ARTICLE_NOT_FOUND.getMsg());
        }
    }

    /**
     * Get Articles ordered by created date with limit and page
     * @param page The page number you want to retrieve
     * @param limit Number of articles within a page
     * @param username The name of the user that the article belongs to
     * @return  The data containing all the article
     */
    public Page<Article> getArticlesByUserName(Integer page, Integer limit, String username) throws CommonException {
        Sort sort = Sort.by(Sort.Direction.DESC, "createDate");
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new CommonException(Error.USER_NOT_FOUNT.getCode(), 404, Error.USER_NOT_FOUNT.getMsg());
        }

        Pageable pageable = PageRequest.of(page, limit, sort);
        return articleRepository.findByStateAndUserId(pageable, Article.PUBLISHED, user.getId());
    }

    /**
     * Get an particular article with given id
     * @param id Article id
     * @return  Article entity
     * @throws CommonException
     */

    public Article getArticle(Long id) throws CommonException {
        try {
            Article article = articleRepository.findById(id).get();
            return article;
        }catch (NoSuchElementException e){
            throw new CommonException(Error.ARTICLE_NOT_FOUND.getCode(),404,Error.ARTICLE_NOT_FOUND.getMsg());
        }
    }
}
