package com.gymunity.point.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.point.dto.PointAdjustAndAdd;
import com.gymunity.point.dto.PointAdjustAndSubtract;


@Mapper
@Repository
public interface EditPointMapper {
	int getUserIDByAccountID(String userAccountId);
    List<Map<String, Object>> getPointsHistoryByUserID(int userId);
    public void adjustAndAddPoints(PointAdjustAndAdd pointAdjustAndAdd);
    public void adjustAndSubtractPoints(PointAdjustAndSubtract pointAdjustAndSubtract);

}
