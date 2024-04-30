package com.gymunity.challenge.service;

import java.util.List;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.dto.PageDTO;
import com.gymunity.challenge.dto.ProfileDTO;

public interface ChallengeService {
	
	public int countProcess();
	
	public List<Challenge> listProcess(PageDTO pv);
	
	public List<ProfileDTO> joinListProcess(int userId);
	
	public ChallengeCreateResponse createChallengeProcess(ChallengeCreateDTO dto, int userId);
	
	public Challenge detailChallengeProcess(int chId);
	
//	public boolean isMemberExists(int userId, int chId);
	
	public void joinChallengeProcess(int chId, int userId);
	
//	public void updateChallengeProcess(Challenge dto, int userId);
	
	public void deleteChallengeProcess(int chId, int userId);
	

}// end interface
