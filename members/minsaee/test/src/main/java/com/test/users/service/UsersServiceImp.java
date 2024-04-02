package com.test.users.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.users.dto.SignResponse;
import com.test.users.dto.UsersDTO;
import com.test.users.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional

public class UsersServiceImp implements UsersService{
	
	private UsersRepository usersRepository;
	
	@Override
	public SignResponse addUserProcess(UsersDTO dto) {
		
		// users 테이블에 데이터 삽입
		usersRepository.insertUser(dto);
		
		// profiles 테이블에 데이터 삽입
		usersRepository.insertProfile(dto);
		
		// 인증 정보 반환
		return new SignResponse(dto.getNickname(), dto.getUserAccountId());
	}


}
