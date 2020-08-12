package com.cyf.vblog.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nickName;
    String blogName;
    String title;
    String location;
    String imageUrl;
}
