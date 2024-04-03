package com.company.challenge;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeServiceImp implements ChallengeService {

	@Autowired
	private ChallengeRepository challengeRepository;
	
	public ChallengeServiceImp() {
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
	public ChallengeDTO contentProcess(int ch_id) {
		return challengeRepository.content(ch_id);
	}

	@Override
	public void updateProcess(ChallengeDTO dto) {
		challengeRepository.update(dto);		
	}

	@Override
	public void deleteProcess(int ch_id) {
		challengeRepository.delete(ch_id);
	}
	

}
