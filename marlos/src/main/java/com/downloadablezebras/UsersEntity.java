package com.downloadablezebras;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "users", schema = "marlos")
public class UsersEntity {
    private int id;
    private String username;
    private byte[] password;
    private String email;
    private String firstName;
    private String lastName;

    @Basic
    @Column(name = "first_name")
    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    @Basic
    @Column(name = "last_name")
    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "password")
    public byte[] getPassword() {
        return password;
    }

    public void setPassword(byte[] password) {
        this.password = password;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersEntity that = (UsersEntity) o;
        return id == that.id &&
                Objects.equals(username, that.username) &&
                Arrays.equals(password, that.password) &&
                Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, username, email);
        result = 31 * result + Arrays.hashCode(password);
        return result;
    }

    public String toString() {
        return this.username + ": " + this.firstName + " " + this.lastName;
    }
}
