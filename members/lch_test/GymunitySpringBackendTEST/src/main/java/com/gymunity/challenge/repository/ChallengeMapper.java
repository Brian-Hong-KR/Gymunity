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
	
	public List<Challenge> joinList(int userId);
	
	public List<ProfileDTO> joinChIdList(int userId);
	
	public int insertChallenges(Challenge dto);

	public int insertMembers(Member dto);

	public Challenge selectChallengesByUserId(int userId);

	public Challenge selectChallengesByChId(int chId);
	
	//챌린지 참가
	public void updateProfile(@Param("chId") int chId, @Param("userId") int userId);
	
	public int getUpdateCount();

	public void updateChallengeCount(int chId);
	
//	public void updateChallenges(Challenge dto);

	public int countMembersByUserIdAndChId(@Param("chId") int chId, @Param("userId") int userId);

	//챌린지 삭제
	public void deleteChallenges(int chId);
	
	public void updateProfileFinished(int chId);

	// 챌린지 proceed 상태 업데이트 및 챌린지 종료
	public void updateProceed(@Param("chId") int chId, @Param("proceed") String proceed);
	
	public List<Challenge> selectAllChallenges();
	
}// end class
