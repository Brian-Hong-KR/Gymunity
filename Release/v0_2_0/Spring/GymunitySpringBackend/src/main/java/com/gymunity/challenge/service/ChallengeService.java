package com.gymunity.challenge.service;

import java.util.List;
import java.util.Map;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.dto.PageDTO;
import com.gymunity.challenge.dto.ProfileDTO;

public interface ChallengeService {
	
	public Map<String, Object> listProcess(int currentPage, String categoryString, int userId);
	
	public Map<String, Object> detailChallengeProcess(int chId, int userId);
	
	public ChallengeCreateResponse createChallengeProcess(ChallengeCreateDTO dto, int userId);
	
	public void joinChallengeProcess(int chId, int userId);
	
	public void deleteChallengeProcess(int chId, int userId);
	
	public void updateProceedProcess();
	

}// end interface
