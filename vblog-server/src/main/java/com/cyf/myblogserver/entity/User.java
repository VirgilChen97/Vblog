package com.cyf.myblogserver.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String username;
    String password;
    String email;
    String nickName;
    String blogName;
    String title;
    String location;
    String imageUrl;
    String settings;
    Boolean emailVerified = false;
}
