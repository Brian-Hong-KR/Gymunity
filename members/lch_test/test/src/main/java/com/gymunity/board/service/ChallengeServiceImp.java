package com.gymunity.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.board.dto.ChallengeDTO;
import com.gymunity.board.dto.PageDTO;
import com.gymunity.board.repository.ChallengeRepository;

@Service
public class ChallengeServiceImp implements ChallengeService {

	@Autowired
	private ChallengeRepository challengeRepository;
	
	public ChallengeServiceImp() {
	}
	
	
	@Override
	public void verifyProcess(ChallengeDTO dto) {
		challengeRepository.verph(dto);
		
	}


	@Override
	public int countProcess() {
		return challengeRepository.count();
	}

	@Override
	public List<ChallengeDTO> listProcess(PageDTO pv) {
		return challengeRepository.list(pv);
	}

	@Override
	public void insertProcess(ChallengeDTO dto) {
		challengeRepository.save(dto);
	}
	


	@Override
	public ChallengeDTO contentProcess(int ch_code) {
		return challengeRepository.content(ch_code);
	}

	@Override
	public void updateProcess(ChallengeDTO dto) {
		challengeRepository.update(dto);
	}

	@Override
	public void deleteProcess(int ch_code) {
		challengeRepository.delete(ch_code);
	}
	

}
