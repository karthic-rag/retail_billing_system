package com.software.backend.service.implementation;

import com.software.backend.entity.OrderEntity;
import com.software.backend.entity.OrderItemEntity;
import com.software.backend.entity.PaymentMethod;
import com.software.backend.io.OrderRequest;
import com.software.backend.io.OrderResponse;
import com.software.backend.io.PaymentDetails;
import com.software.backend.io.PaymentVerificationRequest;
import com.software.backend.repository.OrderRepository;
import com.software.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;


import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImplementation implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = converToOrderEntity(request);
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setPaymentStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ? PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItems = request.getCartItems().stream().map(this::convertToOrderItemEntity).collect(Collectors.toList());

        newOrder.setItems(orderItems);

        newOrder = orderRepository.save(newOrder);
        return convertToResponse(newOrder);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subTotal(newOrder.getSubTotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .items(newOrder.getItems().stream().map(this::convertToItemResponse).collect(Collectors.toList()))
                .paymentDetails(newOrder.getPaymentDetails())
                .createdAt(newOrder.getCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderEntity converToOrderEntity(OrderRequest request) {
       return OrderEntity.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subTotal(request.getSubTotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();

    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderRepository.findByOrderId(orderId).orElseThrow(
                () -> new RuntimeException("order not found")
        );

        orderRepository.delete(existingOrder);

    }

    @Override
    public List<OrderResponse> getLatestOrder() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(orderEntity -> convertToResponse(orderEntity))
                .collect(Collectors.toList());

    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder = orderRepository.findByOrderId(request.getOrderId()).orElseThrow(
                () -> new RuntimeException("order not found")
        );
         // verify razorpay order by signature and payment id and order id

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
        paymentDetails.setPaymentStatus(PaymentDetails.PaymentStatus.COMPLETED);

        existingOrder = orderRepository.save(existingOrder);

        return convertToResponse(existingOrder);

    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderRepository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findByRecentOrders() {

        Pageable pageable = PageRequest.of(
                0,
                5,
                Sort.by("createdAt").descending()
        );

        return orderRepository
                .findAllByOrderByCreatedAtDesc(pageable)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }



}
