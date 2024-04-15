package com.gymunity.challenges.repository;



import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;

@Mapper
@Repository
public interface MemRepository {
	
	public void savemem(MemDTO dto);
	
	public void writemem(MemDTO dto);
	
	public void updateP(MemDTO dto);
	
}
