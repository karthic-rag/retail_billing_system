package com.software.backend.controller;

import com.software.backend.io.OrderRequest;
import com.software.backend.io.OrderResponse;
import com.software.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request){
        try{
            return orderService.createOrder(request);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @DeleteMapping("/delete/{orderId}")
    public String deleteOrder(@PathVariable String orderId){
        try{
            orderService.deleteOrder(orderId);
            return "order deleted Successfully";
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/get/all")
    public List<OrderResponse> getLastestOrders(){
        try{
            return orderService.getLatestOrder();

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
