package com.gymunity.challenges.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.PageDTO;
import com.gymunity.challenges.repository.ChallengeRepository;
import com.gymunity.users.mapper.UsersMapper;
import com.gymunity.users.service.UsersServiceImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeServiceImp implements ChallengeService {

	@Autowired
	private ChallengeRepository challengeRepository;
	

	







	@Override
	public void insertUserUpdateProcess(int user_code) {
		challengeRepository.saveUserUpdate(user_code);
		
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


	@Override
	public void countChProcess(ChallengeDTO dto) {
		challengeRepository.countCH(dto);
		
	}

	

}
