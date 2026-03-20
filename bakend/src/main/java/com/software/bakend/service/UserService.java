package com.software.bakend.service;

import com.software.bakend.io.LoginResponse;
import com.software.bakend.io.UserResponse;
import com.software.bakend.io.LoginRequest;
import com.software.bakend.io.RegisterRequest;

import java.util.List;

public interface UserService {
    UserResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    List<UserResponse> getAllUsers();
    void deleteUser(String email);
}
