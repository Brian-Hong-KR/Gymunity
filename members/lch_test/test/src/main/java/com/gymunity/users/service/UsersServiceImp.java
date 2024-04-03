package com.gymunity.users.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.users.dto.SignResponse;
import com.gymunity.users.dto.UsersDTO;
import com.gymunity.users.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional

public class UsersServiceImp implements UsersService {

	private final UsersRepository usersRepository;

	@Override
	public SignResponse getByUserAccountId(String userAccountId) {
		log.info("로드유저바이유저네임 : {}", userAccountId);
		UsersDTO usersDTO = usersRepository.selectByAccountId(userAccountId);

		if (usersDTO == null)
			new UsernameNotFoundException("히히 몰라! 유저서비스임프");
		return SignResponse.builder().userAccountId(usersDTO.getUserAccountId())
				.userAccountId(usersDTO.getUserAccountId()).accessToken(JwtProvider.createAccessToken(userAccountId))
				.refreshToken(JwtProvider.createRefreshToken(userAccountId)).build();
	}

	// 회원 정보 추가하기
	@Override
	public SignResponse addUserProcess(UsersDTO dto) {

		// users 테이블에 데이터 삽입
		usersRepository.insertUser(dto);

		// profiles 테이블에 데이터 삽입
		usersRepository.insertProfile(dto);

		// 인증 정보 반환
		return new SignResponse(dto.getNickname(), dto.getUserAccountId());

	} // end addUserProcess()

	// 회원 정보 가져오기
	@Override
	public UsersDTO viewUserProcess(String userAccounId) {
		return usersRepository.selectByAccountId(userAccounId);
	}
}
