package com.cyf.myblogserver.repository;

import com.cyf.myblogserver.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Tag, Long> {
}
