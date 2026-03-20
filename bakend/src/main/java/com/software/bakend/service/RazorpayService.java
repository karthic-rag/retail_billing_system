package com.software.bakend.service;

import com.razorpay.RazorpayException;
import com.software.bakend.io.RazorpayOrderResponse;

public interface RazorpayService {
     RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
