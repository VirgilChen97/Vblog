package com.cyf.myblogserver.service;

import com.cyf.myblogserver.entity.Tag;
import com.cyf.myblogserver.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    public static int INCREASE = 0;
    public static int DECREASE = 1;

    TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTags(){
        return tagRepository.findByCountIsNot(0);
    }
}
