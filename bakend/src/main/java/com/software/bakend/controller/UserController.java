package com.software.bakend.controller;

import com.software.bakend.io.RegisterRequest;
import com.software.bakend.io.UserResponse;
import com.software.bakend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @GetMapping("/users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> readUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/delete/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
            return "User deleted successfully";
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
        }
    }

}
