package com.gymunity.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.board.dto.ChallengeDTO;
import com.gymunity.board.dto.MemDTO;
import com.gymunity.board.dto.PageDTO;

@Mapper
@Repository
public interface ChallengeRepository {
	
	public int count();

	public List<ChallengeDTO> list(PageDTO pv);

	public ChallengeDTO content(int ch_code);

	public void save(ChallengeDTO dto);
	
<<<<<<< HEAD
	
=======
	public void saveUserUpdate(int user_code);
>>>>>>> 6bd5d3878a3e3cde60a1907ce7083d8a502e0b7f
	
	public void update(ChallengeDTO dto);
	
	public void delete(int ch_code);
	
	public void finishUserUpdate(int user_code);

}
