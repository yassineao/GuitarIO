package org.authentification.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;


@Entity
@Table(name = "users") // table name in DB
public class User {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // primary key


    @Column(nullable = false) private String username;

    @Column(nullable = false) private String firstname;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setTelNumber(String telNumber) {
        this.telNumber = telNumber;
    }

    @Column(nullable = false) private String lastname;

    @Column(nullable = false, unique = true) private String email;


    @Column(nullable = false) private String password;

    private String telNumber;

    private String address;

    @Column(nullable = false) private String role = "ROLE_USER";


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserLesson> userLessons = new ArrayList<>();



    public List<UserLesson> getUserLessons() {
        return userLessons;
    }

    public void setUserLessons(List<UserLesson> userLessons) {
        this.userLessons = userLessons;
    }

    public User() {
    }


    public void setPassword(String password) {

        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(regex);
        if (pattern.matcher(email).matches())
            this.email = email;
        else
            throw new IllegalArgumentException("Check email ");
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        if(role == "ROLE_ADMIN")
            this.role = role;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelNumber() {
        return telNumber;
    }

    public void setTelNumber(String dialingCode,String telNumber) {
        String regex = "^\\+?[0-9][0-9\\- ]{7,14}$";
        Pattern pattern = Pattern.compile(regex);
        if (pattern.matcher(telNumber).matches())
            this.telNumber = dialingCode+telNumber;
        else  throw new IllegalArgumentException("Check phone number");
    }


    public Long getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
