package com.gymunity.point.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.dto.PointAdjust;
import com.gymunity.point.dto.PointAggr;
import com.gymunity.point.dto.PointSubtract;

@Mapper
@Repository
public interface PointMapper {
	public int addPoint(PointAdd dto);

	public int addOrUpdatePointsAggr(int userId);

	public int subtractPoint(PointSubtract dto);

	public int subtractOrUpdatePointsAggr(int userId);
	
	public int adjustPoint(PointAdjust dto);
	
	public int adjustPointsAggr(int userId);

}// end interface
