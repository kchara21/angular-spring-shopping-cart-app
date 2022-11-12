package com.example.back.service;

import com.example.back.dto.User.UserDTO;
import com.example.back.dto.User.UserResponse;

public interface UserService {

    public UserResponse authenticationUser(UserDTO userDTO);

    public UserDTO registerUser(UserDTO userDTO);


}
