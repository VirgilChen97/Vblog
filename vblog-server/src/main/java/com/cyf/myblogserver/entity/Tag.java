package com.cyf.myblogserver.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Tag{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private String tagName;
}
