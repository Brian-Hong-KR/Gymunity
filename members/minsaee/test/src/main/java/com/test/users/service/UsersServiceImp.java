package com.test.users.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.security.jwt.JwtProvider;
import com.test.users.dto.SignResponse;
import com.test.users.dto.UserDeleteRequest;
import com.test.users.dto.UsersDTO;
import com.test.users.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional

public class UsersServiceImp implements UsersService {

	private final UsersRepository usersRepository;
	private final BCryptPasswordEncoder passwordEncoder;

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

	// 회원정보가져오기
	@Override
	public UsersDTO viewUserProcess(String userAccounId) {
		return usersRepository.selectByAccountId(userAccounId);
	}
	
	// 회원정보수정
	@Override
	public SignResponse updateMemberProcess(UsersDTO dto) {
		
		// users 테이블에 데이터 업데이트
		usersRepository.updateUsers(dto);
		
		// profiles 테이블에 데이터 업데이트
		usersRepository.updateProfiles(dto);
	
		return new SignResponse(dto.getNickname(), dto.getUserEmail());
	}

//	// 회원 아이디, 비밀번호 일치
//	@Override
//	public boolean authenticateUser(UserDeleteRequest request) {
//		UsersDTO user = usersRepository.selectByAccountId(request.getUserAccountId());
//		if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//			return true;
//		}
//		return false;
//	}// authenticateUser()

	@Override
	public boolean authenticateUser(UserDeleteRequest request) {
		UsersDTO user = usersRepository.selectByAccountId(request.getUserAccountId());
		if (user != null) {
			// 사용자의 암호화된 비밀번호를 로그로 출력
			System.out.println("UserId from DB: " + user.getUserId());
			System.out.println("UserAccountId from DB: " + user.getUserAccountId());
			System.out.println("Encrypted password from DB: " + user.getPassword());

			// 비밀번호 일치 검사 실행 및 결과 로깅
			boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
			System.out.println("Password match result: " + isPasswordMatch);

			return isPasswordMatch;
		}
		return false;
	}

	// 회원 탈퇴
	@Override
	public void deleteUserByAccountId(String userAccountId) {
		UsersDTO user = usersRepository.selectByAccountId(userAccountId);
		if (user != null) {
			log.info("-------------------------------------------------------------------------------------");
			log.info("-------------------------------------------------------------------------------------");
			log.info("-------------------------------------------------------------------------------------");
			log.info("Deleting user with userId: {}", user.getUserId()); // 로그 출력
			log.info("Deleting user with userAccountId: {}", user.getUserAccountId()); // 로그 출력
			usersRepository.deleteUser(user.getUserId());
		}
	}// deleteUserByAccountId()

}// end class
