package com.cyf.myblogserver.repository;

import com.cyf.myblogserver.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
