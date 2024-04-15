package com.gymunity.challenges.service;

import java.time.LocalDate;
import java.time.Period;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.repository.ChallengeRepository;
import com.gymunity.challenges.repository.MemRepository;

@Service
public class MemServiceImp implements MemSerice{
	
	@Autowired
	private MemRepository memRepository;
	
	@Autowired
	private ChallengeRepository challengeRepository;
	
	public MemServiceImp() {
		
	}

	@Override
	public void insertProcess(MemDTO dto) {
		// 챌린지 생성시
		
		memRepository.writemem(dto);
		
	}

	@Override
	public void attendProcess(MemDTO dto) {
		// 챌린지 참가시
		memRepository.savemem(dto);
		
	}

	@Override
	public void updateProcess(MemDTO dto) {
		memRepository.updateP(dto);
		
	}
	
	
	
}
