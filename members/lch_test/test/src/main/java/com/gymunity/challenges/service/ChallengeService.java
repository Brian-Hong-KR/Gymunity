package com.gymunity.challenges.service;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.PageDTO;
import com.gymunity.challenges.dto.ProfileDTO;

import lombok.extern.slf4j.Slf4j;


@CrossOrigin("*")
public interface ChallengeService {

	public int countProcess(); 
	public List<ChallengeDTO> listProcess(PageDTO pv);
	public int totalParticipantsProcess(int ch_id);
	public List<ChallengeDTO> joinListProcess(int user_id);
	public void insertProcess(ChallengeDTO dto);
	public ChallengeDTO contentProcess(int num);
	public void updateProcess(ChallengeDTO dto);
	public void deleteProcess(int num);
	public void insertUserUpdateProcess(int num);
	public void countChProcess(ChallengeDTO dto);
	public void totalPointProcess(int ch_id);
	
}
