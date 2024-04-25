package com.gymunity.point.service;

import java.util.List;
import java.util.Map;

import com.gymunity.point.dto.PointAdjustAddSubtract;


public interface EditPointService {
    int getUserIDByAccountID(String userAccountId);
    List<Map<String, Object>> getPointsHistoryByUserID(int userId);
    void adjustPoints(PointAdjustAddSubtract addSubtract);
    
    
}
