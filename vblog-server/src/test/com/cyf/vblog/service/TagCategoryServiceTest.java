package com.cyf.vblog.service;

import com.cyf.vblog.entity.Category;
import com.cyf.vblog.entity.Tag;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.repository.CategoryRepository;
import com.cyf.vblog.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TagCategoryServiceTest {

    @Mock
    TagRepository tagRepository;
    @Mock
    CategoryRepository categoryRepository;

    TagCategoryService tagCategoryService;

    @BeforeEach
    void init(){
        tagCategoryService = new TagCategoryService(tagRepository,categoryRepository);
    }

    @Test
    void getAllUserTags() {
        tagCategoryService.getAllUserTags(1L);
        verify(tagRepository, times(1)).findByUserId(1L);
    }

    @Test
    void getAllUserCategories() {
        tagCategoryService.getAllUserCategories(1L);
        verify(categoryRepository, times(1)).findByUserId(1L);
    }

    @Test
    void getCategory() throws CommonException {
        when(categoryRepository.findById(1L)).thenReturn(Optional.empty());
        CommonException e = assertThrows(CommonException.class, ()->{tagCategoryService.getCategory(1L);});
        assertEquals(e.getInternalCode(), Error.CATEGORY_NOT_FOUND.getCode());

        Category category = new Category();
        category.setId(1L);
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        Category res = tagCategoryService.getCategory(1L);
        assertEquals(res.getId(), category.getId());
    }

    @Test
    void getTag() throws CommonException {
        when(tagRepository.findById(1L)).thenReturn(Optional.empty());
        CommonException e = assertThrows(CommonException.class, ()->{tagCategoryService.getTag(1L);});
        assertEquals(e.getInternalCode(), Error.TAG_NOT_FOUND.getCode());

        Tag tag = new Tag();
        tag.setId(1L);
        when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
        Tag res = tagCategoryService.getTag(1L);
        assertEquals(res.getId(), tag.getId());
    }

    @Test
    void getTagCount() {
        tagCategoryService.getTagCount(1L);
        verify(tagRepository, times(1)).getTagCount(1L);
    }

    @Test
    void getCategoryCount() {
        tagCategoryService.getCategoryCount(1L);
        verify(categoryRepository, times(1)).getCategoryCount(1L);
    }
}