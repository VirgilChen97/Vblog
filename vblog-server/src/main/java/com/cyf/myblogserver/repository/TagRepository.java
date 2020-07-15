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

    @Modifying
    @Transactional
    @Query(value = "update Tag t set t.count = t.count+1 where t.id = :id")
    int increaseTagCount(Long id);

    @Modifying
    @Transactional
    @Query(value = "update Tag t set t.count = t.count-1 where t.id = :id")
    int decreaseTagCount(Long id);
}
