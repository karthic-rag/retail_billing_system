package com.software.backend.service.implementation;


import com.software.backend.entity.Role;
import com.software.backend.entity.UserEntity;
import com.software.backend.io.*;
import com.software.backend.repository.UserRepository;
import com.software.backend.security.JwtUtil;
import com.software.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public UserResponse register(RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("email already exists");
        }

        UserEntity user = UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .enabled(true)
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return convertToResponse(user);

    }



    @Override
    public LoginResponse login(LoginRequest request){
          authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(
                          request.getEmail(),
                          request.getPassword()
                  )
          );

          UserEntity user = userRepository.findByEmail(request.getEmail()).get();

          String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

          return LoginResponse.builder()
                  .email(user.getEmail())
                  .role(user.getRole().name())
                  .token(token)
                  .build();
    }

    @Override
    public List<UserResponse> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(UserEntity -> convertToResponse(UserEntity))
                .collect(Collectors.toList());

    }

    @Override
    public void deleteUser(String id){
        UserEntity existingUser = userRepository.findByUserId(id).orElseThrow(
                ()-> new UsernameNotFoundException("User not found with given id :" + id)
        );

        userRepository.delete(existingUser);
    }

    private UserResponse convertToResponse(UserEntity user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .role(user.getRole().name())
                .build();
    }


}
