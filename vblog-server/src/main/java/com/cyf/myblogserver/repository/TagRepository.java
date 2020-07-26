package com.cyf.myblogserver.repository;

import com.cyf.myblogserver.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByTagNameAndUserId(String tagName, Long userId);
    List<Tag> findByUserId(Long userId);

    @Query(value="select count(article.id) from article join article_tags a on article.id = a.article_id where a.tags_id = ?1", nativeQuery=true)
    Integer getTagCount(Long id);
}
