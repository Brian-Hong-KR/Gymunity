package com.gymunity.challenge.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.Member;
import com.gymunity.challenge.dto.ProfileDTO;
import com.gymunity.challenge.dto.PageDTO;

@Mapper
@Repository
public interface ChallengeMapper {
	
	public int count();
	
	public List<Challenge> list(PageDTO pv);
	
	public List<ProfileDTO> joinList(int user_id);
	
	public int insertChallenges(Challenge dto);

	public int insertMembers(Member dto);

	public Challenge selectChallengesByUserId(int userId);

	public Challenge selectChallengesByChId(int chId);

	public void updateChallenges(Challenge dto);

	public void updateChallengeCount(int chId);

	public int countMembersByUserIdAndChId(@Param("chId") int chId, @Param("userId") int userId);

	public int deleteChallenges(int chId);

}// end class
