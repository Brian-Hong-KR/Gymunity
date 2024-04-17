package com.test.users.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.test.users.dto.PointHistory;
import com.test.users.service.PointService;

import io.swagger.v3.oas.annotations.Operation;



@CrossOrigin("*")
@RestController
public class PointController {

    @Autowired
    private PointService pointService;

    @Operation(summary = "포인트 내역", description = "포인트 내역 API")
    @GetMapping("/points/{userId}")
    public ResponseEntity<List<PointHistory>> getPointHistory(@PathVariable("userId") int userId) {
        List<PointHistory> pointHistory = pointService.getPointHistory(userId);
        return ResponseEntity.ok(pointHistory);
    }
}
