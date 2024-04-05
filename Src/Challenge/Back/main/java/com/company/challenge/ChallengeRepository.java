package com.company.challenge;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ChallengeRepository {
	
	public int count();

	public List<ChallengeDTO> list(PageDTO pv);

	public ChallengeDTO content(int ch_code);

	public void save(ChallengeDTO dto);
	
	public void update(ChallengeDTO dto);
	
	public void delete(int ch_code);

}
