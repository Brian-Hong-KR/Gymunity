package com.gymunity.point.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.dto.PointAdjust;
import com.gymunity.point.dto.PointSubtract;
import com.gymunity.point.service.EditPointService;

@RestController
@RequestMapping("/admin/points")
public class EditPointController {

    @Autowired
    private EditPointService adminEditPointService;

    // userId 찾기
    @GetMapping("/user/{userAccountId}")
    public ResponseEntity<?> getUserIDByAccountID(@PathVariable("userAccountId") String userAccountId) {
        int userId = adminEditPointService.getUserIDByAccountID(userAccountId);
        return ResponseEntity.ok(userId);
    }

    // 내역불러오기
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getPointsHistoryByUserID(@PathVariable("userId") int userId) {
        List<Map<String, Object>> history = adminEditPointService.getPointsHistoryByUserID(userId);
        return ResponseEntity.ok(history);
    }

    // adjust에 반영
    @PostMapping("/adjust")
    public ResponseEntity<?> adjustPoints(@RequestBody PointAdjust pointAdjust) {
        adminEditPointService.adjustPoints(pointAdjust);
        return ResponseEntity.ok("Points adjusted successfully.");
    }

    // add에 반영(양수)
    @PostMapping("/add")
    public ResponseEntity<?> addPoints(@RequestBody PointAdd pointAdd) {
        adminEditPointService.addPoints(pointAdd);
        return ResponseEntity.ok("Points added successfully.");
    }
    
    // subtract에 반영(음수)
    @PostMapping("/subtract")
    public ResponseEntity<?> subtractPoints(@RequestBody PointSubtract pointSubtract) {
        adminEditPointService.subtractPoints(pointSubtract);
        return ResponseEntity.ok("Points subtracted successfully.");
    }
}
