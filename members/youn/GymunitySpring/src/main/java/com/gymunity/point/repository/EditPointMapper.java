package com.gymunity.point.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.dto.PointAdjust;
import com.gymunity.point.dto.PointSubtract;

@Mapper
@Repository
public interface EditPointMapper {
    int getUserIDByAccountID(String userAccountId);
    List<Map<String, Object>> getPointsHistoryByUserID(int userId);
    public void adjustPointsPositive(PointAdjust pointAdjust);
    public void adjustPointsNegative(PointAdjust pointAdjust);
    public void addPoints(PointAdd pointAdd);
    public void subtractPoints(PointSubtract pointSubtract);
}
