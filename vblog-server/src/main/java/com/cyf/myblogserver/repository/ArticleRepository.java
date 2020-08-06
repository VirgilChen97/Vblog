package com.cyf.myblogserver.repository;


import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.entity.Tag;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByStateAndUserId(Pageable pageable, Integer state, Long userId);
    Page<Article> findByStateAndUserIdAndCategoryId(Pageable pageable, Integer state, Long userId, Long CategoryId);
    Page<Article> findByStateAndUserIdAndTagsId(Pageable pageable, Integer state, Long userId, Long CategoryId);
}
