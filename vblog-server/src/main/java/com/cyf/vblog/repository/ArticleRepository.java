package com.cyf.vblog.repository;


import com.cyf.vblog.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByStateAndUserId(Pageable pageable, Integer state, Long userId);
    Page<Article> findByStateAndUserIdAndCategoryId(Pageable pageable, Integer state, Long userId, Long CategoryId);
    Page<Article> findByStateAndUserIdAndTagsId(Pageable pageable, Integer state, Long userId, Long CategoryId);
}
