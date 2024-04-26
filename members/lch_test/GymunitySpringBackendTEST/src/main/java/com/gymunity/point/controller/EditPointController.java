package com.gymunity.point.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.point.dto.PointAdjustAddSubtract;
import com.gymunity.point.service.EditPointService;

@CrossOrigin("*")
@RestController
@RequestMapping("/points")
public class EditPointController {

    @Autowired
    private EditPointService editPointService;

    // userId 찾기
    @GetMapping("/user/{userAccountId}")
    public ResponseEntity<?> getUserIDByAccountID(@PathVariable("userAccountId") String userAccountId) {
    	int userId = editPointService.getUserIDByAccountID(userAccountId);
        return ResponseEntity.ok(userId);
    }

    // 내역불러오기
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getPointsHistoryByUserID(@PathVariable("userId") int userId) {
        List<Map<String, Object>> history = editPointService.getPointsHistoryByUserID(userId);
        return ResponseEntity.ok(history);
    }

    @PostMapping("/adjustPoints")
    public ResponseEntity<?> adjustPoints(@RequestBody PointAdjustAddSubtract addSubtract) {
        try {
            editPointService.adjustPoints(addSubtract);
            return ResponseEntity.ok("Points adjusted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
