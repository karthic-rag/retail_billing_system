package com.software.backend.service;

import com.software.backend.io.LoginResponse;
import com.software.backend.io.UserResponse;
import com.software.backend.io.LoginRequest;
import com.software.backend.io.RegisterRequest;

import java.util.List;

public interface UserService {
    UserResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    List<UserResponse> getAllUsers();
    void deleteUser(String email);
}
