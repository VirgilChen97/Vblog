package com.cyf.myblogserver.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Category{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String categoryName;

}
