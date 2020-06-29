package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.exception.CommonException;
import com.cyf.myblogserver.repository.CategoryRepository;
import com.cyf.myblogserver.repository.TagRepository;
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

    @Autowired
    public ArticleService(ArticleRepository articleRepository, TagRepository tagRepository, CategoryRepository categoryRepository) {
        this.articleRepository = articleRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
    }

    /**
     * Save given article to database, while updating the tag and category
     * @param article The article need to be saved
     * @return Id if saved article
     */
    public Long saveArticle(Article article){

        // Go through all tags in the article
        log.info("Article with tags {}", article.getTags());
        for(Tag tag: article.getTags()){
            Tag getTag = tagRepository.findByTagName(tag.getTagName());

            if(getTag == null){

                // If the tag doesn't exist, create the tag
                tagRepository.save(tag);
            }else{

                // If exist, replace the id and increase the tag count int the db
                tag.setId(getTag.getId());
                tagRepository.increaseTagCount(tag.getId());
            }
        }

        // Check the article's category
        log.info("Article with category {}", article.getCategory());

        // Check whether the category exist
        Category getCategory =  categoryRepository.findByCategoryName(article.getCategory().getCategoryName());
        if (getCategory == null) {

            // If not, then create the tag;
            categoryRepository.save(article.getCategory());
        }else{

            // If exist, replace the id and increase the category count int the db
            article.getCategory().setId(getCategory.getId());
            categoryRepository.increaseCategoryCount(article.getCategory().getId());
        }

        // save the article and return its id;
        Article article1 = articleRepository.save(article);
        log.info("Article saved with id {}", article1.getId());
        return article1.getId();
    }

    /**
     * Get Articles ordered by created date with limit and page
     * @param page The page number you want to retrieve
     * @param limit Number of articles within a page
     * @return  The data containing all the article
     */
    public Page<Article> getArticles(Integer page, Integer limit){
        Sort sort = Sort.by(Sort.Direction.DESC, "createDate");
        Pageable pageable = PageRequest.of(page, limit, sort);
        Page<Article> articles = articleRepository.findByState(pageable, Article.PUBLISHED);
        return articles;
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
            throw new CommonException(404,404,"Failed to find article with given id");
        }
    }
}
