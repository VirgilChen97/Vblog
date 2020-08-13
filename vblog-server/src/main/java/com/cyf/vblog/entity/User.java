package com.cyf.vblog.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String username;
    String password;
    String email;

    @OneToOne(targetEntity = UserSettings.class, cascade = CascadeType.ALL)
    UserSettings userSettings;
    Boolean emailVerified = false;
}
