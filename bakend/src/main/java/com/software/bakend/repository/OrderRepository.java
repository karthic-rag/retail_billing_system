package com.software.bakend.repository;

import com.software.bakend.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity>findByOrderId(String orderId);
    List<OrderEntity>findAllByOrderByCreatedAtDesc();

    @Query("""
       SELECT SUM(o.grandTotal)
       FROM OrderEntity o
       WHERE FUNCTION('DATE', o.createdAt) = :date
       """)
    Double sumSalesByDate(@Param("date")LocalDate date);

    @Query("""
       SELECT COUNT(o)
       FROM OrderEntity o
       WHERE FUNCTION('DATE', o.createdAt) = :date
       """)
    Long countByOrderDate(@Param("date")LocalDate date);

    List<OrderEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);


}
