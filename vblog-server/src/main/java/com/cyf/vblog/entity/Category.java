package com.cyf.vblog.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Category{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne User user;

    @Column(nullable = false)
    private String categoryName;
}
