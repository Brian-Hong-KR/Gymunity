package com.gymunity.challenge.service;

import java.util.List;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.dto.PageDTO;
import com.gymunity.challenge.dto.ProfileDTO;

public interface ChallengeService {
	
	public int countProcess();
	
	public List<Challenge> listProcess(int category, int startRow, int blockCount);
	
	public List<Challenge> joinListProcess(int userId);
	
	public List<ProfileDTO> joinChIdListProcess(int userId);
	
	public ChallengeCreateResponse createChallengeProcess(ChallengeCreateDTO dto, int userId);
	
	public Challenge detailChallengeProcess(int chId);
	
	public void joinChallengeProcess(int chId, int userId);
	
	public void deleteChallengeProcess(int chId, int userId);
	
	public void updateProceedProcess();
	

}// end interface
