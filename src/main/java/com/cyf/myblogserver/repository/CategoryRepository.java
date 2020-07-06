package com.cyf.myblogserver.repository;

import com.cyf.myblogserver.entity.Category;
import com.cyf.myblogserver.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryNameAndUserId(String categoryName, Long userId);
    List<Category> findByCountIsNot(Integer count);

    @Modifying
    @Transactional
    @Query(value = "update Category t set t.count = t.count+1 where t.id = :id")
    int increaseCategoryCount(Long id);

    @Modifying
    @Transactional
    @Query(value = "update Category t set t.count = t.count-1 where t.id = :id")
    int decreaseCategoryCount(Long id);
}
