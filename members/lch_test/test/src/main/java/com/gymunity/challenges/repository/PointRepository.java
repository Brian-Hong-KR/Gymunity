package com.gymunity.challenges.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.PointDTO;

@Mapper
@Repository
public interface PointRepository {

		public void attendPoint(PointDTO dto);
		
		public void rewardPoint(PointDTO dto);
		
		
		public int findTotalPoint (int mem_user_id, int mem_ch_id);
		
		public double findRate (int mem_user_id, int mem_ch_id);
}
