package com.gymunity.challenge.service;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.response.ChallengeDetailResponse;
import com.gymunity.challenge.response.ChallengeJoinResponse;

public interface ChallengeService {
	
	public ChallengeCreateResponse createChallengeProcess(ChallengeCreateDTO dto, int userId);
	
	public ChallengeDetailResponse detailChallengeProcess(int chId);
	
//	public boolean isMemberExists(int userId, int chId);
	
	public ChallengeJoinResponse joinChallengeProcess(int chId, int userId);
	
	public void updateChallengeProcess(Challenge dto, int userId);
	
	public void deleteChallengeProcess(int userId);
	

}// end interface
