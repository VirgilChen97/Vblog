package com.cyf.myblogserver.repository;


import com.cyf.myblogserver.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    public Page<Article> findByState(Pageable pageable, Integer state);
}
