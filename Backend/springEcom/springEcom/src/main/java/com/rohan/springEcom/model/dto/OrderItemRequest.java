package com.rohan.springEcom.model.dto;

public record OrderItemRequest(
        int productId,
        int quantity

) {
}
