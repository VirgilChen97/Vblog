package com.cyf.vblog.service;

import com.alibaba.fastjson.JSONObject;
import com.cyf.vblog.entity.Article;
import com.cyf.vblog.entity.Category;
import com.cyf.vblog.entity.Tag;
import com.cyf.vblog.entity.User;
import com.cyf.vblog.exception.CommonException;
import com.cyf.vblog.exception.Error;
import com.cyf.vblog.repository.ArticleRepository;
import com.cyf.vblog.repository.CategoryRepository;
import com.cyf.vblog.repository.TagRepository;
import com.cyf.vblog.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @Mock
    ArticleRepository articleRepository;
    @Mock
    TagRepository tagRepository;
    @Mock
    CategoryRepository categoryRepository;
    @Mock
    UserRepository userRepository;

    ArticleService articleService;

    @BeforeEach
    public void init(){
        articleService = new ArticleService(articleRepository,tagRepository,categoryRepository,userRepository);
    }

    @Test
    void saveArticle() throws CommonException {
        Article article = JSONObject.parseObject(
                "{" +
                        "\"title\":\"Test\"," +
                        "\"state\":0," +
                        "\"mdContent\":\"Some content\\n\"," +
                        "\"tags\":[{\"tagName\":\"tag1\"},{\"tagName\":\"tag2\"}]," +
                        "\"category\":{\"categoryName\":\"cat1\"}" +
                        "}", Article.class);
        User user = new User();
        user.setId(1L);
        article.setUser(user);

        // userId in the request doesn't exist
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        CommonException e = assertThrows(CommonException.class, ()->{articleService.saveArticle(article);});
        assertEquals(Error.USER_NOT_FOUNT.getCode(), e.getInternalCode());

        //cat1 exist, tag1 exist, tag2 doesn't exist
        Tag tag1 = new Tag();
        tag1.setId(1L);
        tag1.setTagName("tag1");
        Category category1 = new Category();
        category1.setId(1L);
        category1.setCategoryName("cat1");
        user = new User();
        user.setId(1L);
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(tagRepository.findByTagNameAndUserId(eq("tag1"), anyLong())).thenReturn(tag1);
        when(categoryRepository.findByCategoryNameAndUserId(eq("cat1"), anyLong())).thenReturn(category1);
        when(articleRepository.save(any())).thenAnswer(invocationOnMock -> {
            Article res = invocationOnMock.getArgument(0, Article.class);
            res.setId(1L);
            return res;
        });

        articleService.saveArticle(article);
        ArgumentCaptor<Article> articleArgumentCaptor = ArgumentCaptor.forClass(Article.class);
        verify(articleRepository, times(1)).save(articleArgumentCaptor.capture());
        Article savedArticle = articleArgumentCaptor.getValue();

        assertEquals(savedArticle.getId(), 1L);
        assertEquals(savedArticle.getCategory().getId(), 1L);
        assertEquals(savedArticle.getTags().get(0).getId(), 1L);
        verify(tagRepository, times(1)).save(any(Tag.class));
    }

    @Test
    void editArticle() {

    }

    @Test
    void deleteArticle() throws CommonException {
        Article articleToBeDeleted = new Article();
        User articleOwner = new User();
        articleOwner.setId(1L);
        articleToBeDeleted.setUser(articleOwner);
        articleToBeDeleted.setId(1L);
        when(articleRepository.findById(1L)).thenReturn(Optional.of(articleToBeDeleted));

        // Try to delete an article that doesn't belongs to the user
        CommonException e = assertThrows(CommonException.class, ()->{articleService.deleteArticle(1L, 2L);});
        assertEquals(e.getInternalCode(), Error.PERMISSION_DENIED.getCode());

        // Try to delete an article that doesn't exist
        when(articleRepository.findById(1L)).thenReturn(Optional.empty());
        e = assertThrows(CommonException.class, ()->{articleService.deleteArticle(1L, 2L);});
        assertEquals(e.getInternalCode(), Error.ARTICLE_NOT_FOUND.getCode());

        // Try to delete an normal article
        when(articleRepository.findById(1L)).thenReturn(Optional.of(articleToBeDeleted));
        articleService.deleteArticle(1L, 1L);
        verify(articleRepository, times(1)).deleteById(1L);
    }

    @Test
    void getArticlesByUserName() {
    }
}