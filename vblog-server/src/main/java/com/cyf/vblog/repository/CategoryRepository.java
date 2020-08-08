package com.cyf.vblog.repository;

import com.cyf.vblog.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryNameAndUserId(String categoryName, Long userId);
    List<Category> findByUserId(Long userId);

    @Query(value="select count(article.id) from article where category_id = ?1", nativeQuery=true)
    Integer getCategoryCount(Long id);
}
