package com.gymunity.point.controller;

//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.gymunity.point.dto.PointAdd;
//import com.gymunity.point.dto.PointAdjust;
//import com.gymunity.point.dto.PointAdjustAddSubtract;
////import com.gymunity.point.dto.PointAdjustAndAdd;
////import com.gymunity.point.dto.PointAdjustAndSubtract;
//import com.gymunity.point.dto.PointSubtract;
//import com.gymunity.point.service.EditPointService;
//
//@RestController
//@RequestMapping("/admin/points")
//public class EditPointController {
//
//    @Autowired
//    private EditPointService editPointService;
//
//    // userId 찾기
//    @GetMapping("/admin/points/user/${userAccountId}")
//    public ResponseEntity<?> getUserIDByAccountID(@PathVariable("userAccountId") String userAccountId) {
//        int userId = editPointService.getUserIDByAccountID(userAccountId);
//        return ResponseEntity.ok(userId);
//    }
//
//    // 내역불러오기
//    @GetMapping("/admin/points/history/${userId}")
//    public ResponseEntity<?> getPointsHistoryByUserID(@PathVariable("userId") int userId) {
//        List<Map<String, Object>> history = editPointService.getPointsHistoryByUserID(userId);
//        return ResponseEntity.ok(history);
//    }
//
//    @PostMapping("/admin/points/adjustPoints")
//    public ResponseEntity<?> adjustPoints(@RequestBody PointAdjustAddSubtract addSubtract) {
//        try {
//            editPointService.adjustPoints(addSubtract);
//            return ResponseEntity.ok("Points adjusted successfully.");
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
//        }
//    }
//}
