package com.software.backend.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class RazorpayOrderResponse {
    private String id;
    private String entity;
    private Double amount;
    private String currency;
    private String status;
    private LocalDate created_at;
    private String receipt;
}
