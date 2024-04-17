package com.gymunity.challenges.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PointDTO;

@Mapper
@Repository
public interface TestMapper {
	public void insertReward_point(int member_id);
	
	public MemDTO selectMembymem_id(int member_id);
	
	public ChallengeDTO selectChbymem_ch_id(int ch_id);
	
	public int addPoint(PointDTO dto);

	public int addOrUpdatePointsAggr(int userId);

}
