package com.gymunity.challenges.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.PointDTO;

import io.lettuce.core.dynamic.annotation.Param;

@Mapper
@Repository
public interface PointRepository {

		public void attendPoint(PointDTO dto);
		
		public void rewardPoint(PointDTO dto);
		
		
		int findTotalPoint(@Param("mem_user_id") int mem_user_id, @Param("mem_ch_id") int mem_ch_id);
		
		PointDTO findRate(Map<String, Object> params);
}
