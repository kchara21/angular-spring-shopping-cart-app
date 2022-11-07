package com.example.back.service;

import com.example.back.dto.User.UserDTO;
import com.example.back.dto.User.UserResponse;
import com.example.back.entities.User;
import com.example.back.exceptions.ProjectAppException;
import com.example.back.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;



    @Override
    public UserResponse authenticationUser(UserDTO userDTO) {
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();

        // BUSCAR SI EXISTE USUARIO EN BD:
        User userFounded =  userRepository.findByEmail(userDTO.getEmail());

        // Si NO ENCUENTRA A NINGUN USUARIO
        if(userFounded == null)
            throw new ProjectAppException(HttpStatus.BAD_REQUEST,"User or Password incorrect");


        // SI NO EXISTE ENVIO MENSAJE DE ERROR
        if(!(userFounded.getEmail().equals(email) && userFounded.getPassword().equals(password)))
            throw new ProjectAppException(HttpStatus.BAD_REQUEST,"User or Password incorrect");

        // SI EXISTE ENTONCES DEVUELVO "TOKEN"
        UserResponse userResponse = new UserResponse();
        userResponse.setToken(userFounded.getId());
        userResponse.setUsername(userFounded.getEmail());

        return userResponse;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        List<User> userExist = userRepository.findAll().stream().toList();
        User newUser = mappingEntity(userDTO);


        if(userExist.size()<1){
            userRepository.save(newUser);
        }

        UserDTO userResponse = mappingDTO(newUser);
        return userResponse;
    }


    private UserDTO mappingDTO(User user){
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

    //Convierte de DTO a Entidad
    private User mappingEntity(UserDTO userDTO){
        User user = modelMapper.map(userDTO,User.class);
        return user;
    }

}
