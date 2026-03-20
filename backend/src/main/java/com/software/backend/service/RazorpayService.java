package com.software.backend.service;

import com.razorpay.RazorpayException;
import com.software.backend.io.RazorpayOrderResponse;

public interface RazorpayService {
     RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
