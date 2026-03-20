package com.software.bakend.controller;

import com.razorpay.RazorpayException;
import com.software.bakend.io.OrderResponse;
import com.software.bakend.io.PaymentRequest;
import com.software.bakend.io.PaymentVerificationRequest;
import com.software.bakend.io.RazorpayOrderResponse;
import com.software.bakend.service.OrderService;
import com.software.bakend.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create/order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
