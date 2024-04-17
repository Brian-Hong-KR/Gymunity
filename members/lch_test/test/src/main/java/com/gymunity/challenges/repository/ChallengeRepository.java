package com.gymunity.challenges.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PageDTO;
import com.gymunity.challenges.dto.ProfileDTO;

@Mapper
@Repository
public interface ChallengeRepository {
	
	public int count();

	public List<ChallengeDTO> list(PageDTO pv);
	
	public List<ProfileDTO> joinList(int user_id);

	public ChallengeDTO content(int ch_code);

	public void save(ChallengeDTO dto);
	
	public void update(ChallengeDTO dto);
	
	public void delete(int ch_code);
	
	public void saveUserUpdate(int user_code);
	
	public void countCH(ChallengeDTO dto);
	
	// 토탈 포인트
	public ChallengeDTO totalP(int ch_id);



}
