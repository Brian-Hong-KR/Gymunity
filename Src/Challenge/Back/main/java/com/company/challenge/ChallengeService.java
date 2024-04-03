package com.company.challenge;

import java.util.List;

public interface ChallengeService {

	public int countProcess(); 
	public List<ChallengeDTO> listProcess(PageDTO pv);
	public void insertProcess(ChallengeDTO dto);
	public ChallengeDTO contentProcess(int ch_id);
	public void updateProcess(ChallengeDTO dto);
	public void deleteProcess(int num);
}
