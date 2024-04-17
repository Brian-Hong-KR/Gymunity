package com.gymunity.challenge.service;

import com.gymunity.challenge.dto.ChallengeCreateDTO;

public interface ChallengeService {
	
	public void createChallengeProcess(ChallengeCreateDTO dto, int userId);
	

}// end interface
