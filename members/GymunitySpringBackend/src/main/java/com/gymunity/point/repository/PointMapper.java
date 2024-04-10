package com.gymunity.point.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.point.entity.PointAdd;
import com.gymunity.point.entity.PointAggr;
import com.gymunity.point.entity.PointSubtract;

@Mapper
@Repository
public interface PointMapper {
	public int addPoint(PointAdd dto);

	public int addOrUpdatePointsAggr(int userId);

	public int subtractPoint(PointSubtract dto);

	public int subtractOrUpdatePointsAggr(int userId);

}// end interface
