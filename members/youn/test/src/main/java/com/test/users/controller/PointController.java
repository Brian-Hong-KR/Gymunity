package com.test.users.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.users.dto.PointHistory;
import com.test.users.service.PointService;

@RestController
@RequestMapping("/points")
public class PointController {

    @Autowired
    private PointService pointService;

    @GetMapping("/{userId}/history")
    public ResponseEntity<List<PointHistory>> getPointHistory(@PathVariable int userId) {
        List<PointHistory> pointHistory = pointService.getPointHistory(userId);
        return ResponseEntity.ok(pointHistory);
    }
}
