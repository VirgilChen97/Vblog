package com.cyf.myblogserver.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Article{
    public static final int PUBLISHED = 0;
    public static final int DRAFT = 1;
    public static final int DELETED = -1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private int state = PUBLISHED;

    @ManyToMany(targetEntity = Tag.class)
    private List<Tag> tags;

    @ManyToOne(targetEntity = Category.class)
    private Category category;
    private String mdContent;

    @CreatedDate
    private Date createDate;

    @LastModifiedDate
    private Date lastModifiedDate;
}
