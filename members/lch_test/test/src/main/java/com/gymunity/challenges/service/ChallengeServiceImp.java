package com.gymunity.challenges.service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.PageDTO;
import com.gymunity.challenges.dto.ProfileDTO;
import com.gymunity.challenges.repository.ChallengeRepository;
import com.gymunity.challenges.repository.MemRepository;
import com.gymunity.challenges.repository.VerifyRepository;
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
	
	@Autowired
	private VerifyRepository verifyRepository;

	@Override
	public void insertUserUpdateProcess(int user_code) {
		challengeRepository.saveUserUpdate(user_code);
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
	public List<ChallengeDTO> joinListProcess(int user_id) {
		return challengeRepository.joinList(user_id);
	}
	
	@Override
	public int totalParticipantsProcess(int ch_id) {
		return challengeRepository.totalParticipants(ch_id);
	}

	@Override
	public void insertProcess(ChallengeDTO dto) {

		LocalDate startDate = dto.getCh_start_date();
		LocalDate endDate = startDate.plusWeeks(2);
		dto.setCh_end_date(endDate);
	    // 6. 저장
	    challengeRepository.save(dto);	
	}
	


	@Override
	public ChallengeDTO contentProcess(int ch_code) {
		return challengeRepository.content(ch_code);
	}

	@Override
	public void updateProcess(ChallengeDTO dto) {
		LocalDate startDate = dto.getCh_start_date();
		LocalDate endDate = startDate.plusWeeks(2);
		dto.setCh_end_date(endDate);
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

	@Override
	public void totalPointProcess(int ch_id) {
		challengeRepository.totalP(ch_id);
		
	}
	

}
