package com.example.back.controller;

import com.example.back.dto.Sale.SaleDTO;
import com.example.back.dto.User.UserDTO;
import com.example.back.dto.User.UserResponse;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        return new ResponseEntity<>(userService.registerUser(userDTO), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> authentication(@RequestBody UserDTO userDTO){
        UserResponse userResponse = userService.authenticationUser(userDTO);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }




}
