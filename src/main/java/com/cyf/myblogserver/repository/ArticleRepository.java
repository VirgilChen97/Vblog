package com.cyf.myblogserver.repository;


import com.cyf.myblogserver.entity.Article;
import com.cyf.myblogserver.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByState(Pageable pageable, Integer state);
}
