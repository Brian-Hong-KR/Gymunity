package com.gymunity.challenges.service;

import java.lang.reflect.Member;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.VerifyDTO;
import com.gymunity.challenges.repository.ChallengeRepository;
import com.gymunity.challenges.repository.MemRepository;
import com.gymunity.challenges.repository.VerifyRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class VerifyServiceImp implements VerifyService{

	
	@Autowired
	private VerifyRepository verifyRepository;
	
	@Autowired
	private ChallengeRepository challengeRepository;


	@Autowired
	private MemRepository memRepository;

	
	// 챌린지 인증
	@Override
	public void verifyProcess(VerifyDTO dto) {
		
	    verifyRepository.verph(dto);
	}


	@Override
	public void updateMemProcess(VerifyDTO dto) {
		verifyRepository.updateMemRate(dto);
		
	}

























	
	
}
