package com.gymunity.point.service;

import java.util.List;
import java.util.Map;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.dto.PointAdjust;
import com.gymunity.point.dto.PointSubtract;

public interface EditPointService {
    int getUserIDByAccountID(String userAccountId);
    List<Map<String, Object>> getPointsHistoryByUserID(int userId);
    void adjustPoints(PointAdjust pointAdjust);
    void addPoints(PointAdd pointAdd);
    void subtractPoints(PointSubtract pointSubtract);
}
