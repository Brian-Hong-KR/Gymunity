package com.gymunity.point.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.point.dto.PointAdjustAddSubtract;
import com.gymunity.point.dto.PointAdjustAndAdd;
import com.gymunity.point.dto.PointAdjustAndSubtract;


@Mapper
@Repository
public interface EditPointMapper {
	int getUserIDByAccountID(String userAccountId);
    List<Map<String, Object>> getPointsHistoryByUserID(int userId);
	 public void insertPointAdjust(PointAdjustAddSubtract pointAdjustAddSubtract);
	 public void updateTotalPoints(PointAdjustAddSubtract pointAdjustAddSubtract);
	 public void updateCurrentPoints(PointAdjustAddSubtract pointAdjustAddSubtract);
	 public void insertPointAdd(PointAdjustAddSubtract pointAdjustAddSubtract);
	 public void insertPointSubtract(PointAdjustAddSubtract pointAdjustAddSubtract);
}
