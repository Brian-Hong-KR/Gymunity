package com.gymunity.challenges.service;

import java.util.List;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.PageDTO;

public interface ChallengeService {

	public int countProcess(); 
	public List<ChallengeDTO> listProcess(PageDTO pv);
	public void insertProcess(ChallengeDTO dto);
	public void insertUserUpdateProcess(int num);
	public ChallengeDTO contentProcess(int num);
	public void updateProcess(ChallengeDTO dto);
	public void deleteProcess(int num);
	public void finishUserUpdateProcess(int num);
}
