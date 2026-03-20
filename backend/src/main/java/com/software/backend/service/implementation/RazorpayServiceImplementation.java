package com.software.backend.service.implementation;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.software.backend.io.RazorpayOrderResponse;
import com.software.backend.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImplementation implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpaySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("id", UUID.randomUUID().toString());
        orderRequest.put("amount", amount);
        orderRequest.put("currency", currency);
        orderRequest.put("entity", "order");
        orderRequest.put("status", "created");
        orderRequest.put("created_at", LocalDate.now());
        orderRequest.put("receipt", "order_rcpid" + System.currentTimeMillis());

        return convertToResponse(orderRequest);
    }

    private RazorpayOrderResponse convertToResponse(JSONObject order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id").toString())
                .entity(order.get("entity").toString())
                .amount((Double) order.get("amount"))
                .currency(order.get("currency").toString())
                .status(order.get("status").toString())
                .created_at((LocalDate) order.get("created_at"))
                .receipt(order.get("receipt").toString())
                .build();

    }
}
