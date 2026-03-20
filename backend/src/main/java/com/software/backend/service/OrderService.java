package com.software.backend.service;

import com.software.backend.io.OrderRequest;
import com.software.backend.io.OrderResponse;
import com.software.backend.io.PaymentVerificationRequest;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrder();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findByRecentOrders();
}
