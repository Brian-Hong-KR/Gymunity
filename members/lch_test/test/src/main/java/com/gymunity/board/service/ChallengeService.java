package com.gymunity.board.service;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymunity.board.dto.ChallengeDTO;
import com.gymunity.board.dto.PageDTO;

import lombok.extern.slf4j.Slf4j;


@CrossOrigin("*")
public interface ChallengeService {

	public int countProcess(); 
	public List<ChallengeDTO> listProcess(PageDTO pv);
	public void insertProcess(ChallengeDTO dto);
	public ChallengeDTO contentProcess(int num);
	public void updateProcess(ChallengeDTO dto);
	public void deleteProcess(int num);
}
