package com.example.back.dto.User;

public class UserResponse {
    private String username;
    private long token;


    public UserResponse() {
        super();
    }

    public UserResponse(String username, long token) {
        this.username = username;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getToken() {
        return token;
    }

    public void setToken(long token) {
        this.token = token;
    }
}
