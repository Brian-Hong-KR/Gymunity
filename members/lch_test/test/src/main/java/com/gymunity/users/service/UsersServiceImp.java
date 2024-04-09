package com.gymunity.users.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.users.dto.Point;
import com.gymunity.users.dto.SignResponse;
import com.gymunity.users.dto.Survey;
import com.gymunity.users.dto.UserDeleteRequest;
import com.gymunity.users.dto.UserRegistrationDTO;
import com.gymunity.users.dto.UsersDTO;
import com.gymunity.users.mapper.UsersMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional

public class UsersServiceImp implements UsersService {

	private final UsersMapper usersMapper;
	private final BCryptPasswordEncoder passwordEncoder;

	@Override
	public SignResponse getByUserAccountId(String userAccountId) {
		log.info("로드유저바이유저네임 : {}", userAccountId);
		UsersDTO usersDTO = usersMapper.selectByAccountId(userAccountId);

		if (usersDTO == null)
			new UsernameNotFoundException("히히 몰라! 유저서비스임프");
		return SignResponse.builder().userAccountId(usersDTO.getUserAccountId())
				.userAccountId(usersDTO.getUserAccountId()).accessToken(JwtProvider.createAccessToken(userAccountId))
				.refreshToken(JwtProvider.createRefreshToken(userAccountId)).build();
	}

	// 회원 정보 추가하기
	@Override
	public SignResponse addUserProcess(UserRegistrationDTO dto) {
		
		UsersDTO usersDTO = dto.getUsersDTO();
		Survey survey = dto.getSurvey();
		Point point = dto.getPoint();

		// users 테이블에 데이터 삽입
		usersMapper.insertUser(usersDTO);

		// profiles 테이블에 데이터 삽입
		usersMapper.insertProfile(usersDTO);
		
		// UsersDTO의 userId를 Survey 객체에 설정
		survey.setUserId(usersDTO.getUserId());
		
		// 테이블에 데이터 삽입
		usersMapper.insertSurvey(survey);
//		usersMapper.insertPt(survey); pt TABLE 삽입
		
		// UsersDTO의 userId를 Point 객체에 설정
		point.setUserId(usersDTO.getUserId());
		
		usersMapper.addPoint(point);
		usersMapper.subtractPoint(point);
		
		
		

		// 인증 정보 반환
		return new SignResponse(usersDTO.getNickName(), usersDTO.getUserAccountId());

	} // end addUserProcess()

	
	@Override
	public void addOrUpdatePointsAggregate(int userId) {

		usersMapper.addOrUpdatePointsAggregate(userId);
		
		log.info("addOrUpdatePointsAggregate: {}", userId);
		
	}
	
	// 회원정보가져오기
	@Override
	public UsersDTO viewUserProcess(String userAccountId) {
		return usersMapper.selectByAccountId(userAccountId);
	}
	
	// 회원정보수정
	@Override
	public SignResponse updateMemberProcess(UsersDTO dto) {
		
		// users 테이블에 데이터 업데이트
		usersMapper.updateUsers(dto);
		
		// profiles 테이블에 데이터 업데이트
		usersMapper.updateProfiles(dto);
	
		return new SignResponse(dto.getNickName(), dto.getUserEmail());
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
		UsersDTO user = usersMapper.selectByAccountId(request.getUserAccountId());
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
		UsersDTO user = usersMapper.selectByAccountId(userAccountId);
		if (user != null) {
			log.info("-------------------------------------------------------------------------------------");
			log.info("-------------------------------------------------------------------------------------");
			log.info("-------------------------------------------------------------------------------------");
			log.info("Deleting user with userId: {}", user.getUserId()); // 로그 출력
			log.info("Deleting user with userAccountId: {}", user.getUserAccountId()); // 로그 출력
			usersMapper.deleteUser(user.getUserId());
		}
	}// deleteUserByAccountId()

}// end class
