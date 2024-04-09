package com.test.users.service;

import java.time.LocalDateTime;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.security.jwt.JwtProvider;
import com.test.users.dto.Point;
import com.test.users.dto.SignResponse;
import com.test.users.dto.Survey;
import com.test.users.dto.UserDeleteRequest;
import com.test.users.dto.UserRegistrationDTO;
import com.test.users.dto.UsersDTO;
import com.test.users.mapper.UsersMapper;

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

		if (usersDTO == null) {
			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
		}

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

		// 회원가입 보상과 회원의 증가,차감테이블 생성
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

//	@Override
//	public void updateLastLogin(String userAccountId) {
//		// lastLogin 업데이트
//		LocalDateTime now = LocalDateTime.now();
//		UsersDTO usersDTO = usersMapper.selectByAccountId(userAccountId);
//		
//		if (usersDTO != null) {
//			usersDTO.setLastLogin(now);
//			
//			// 로그인 로그 업데이트
//			usersMapper.updateLastLogin(usersDTO);
//			
//			// 로그인 보상 로직
//	        // 이 부분은 특정 조건(예: 하루에 한 번만 지급)에 맞춰 실행되어야 함
//			/* 로그인 보상 지급 조건 */
//	    }
//	}

	@Override
	public void updateLastLogin(String userAccountId) {
		// 현재 시간
		LocalDateTime now = LocalDateTime.now();

		// 유저 정보 가져오기
		UsersDTO usersDTO = usersMapper.selectByAccountId(userAccountId);

		if (usersDTO != null) {
			// 마지막 로그인 시간 가져오기
			LocalDateTime lastLogin = usersDTO.getLastLogin();

			// 마지막 로그인이 오늘 날짜 이전이고, 현재 시간이 새벽 4시 이후인 경우에만 로그인 보상 지급
			if (lastLogin.isBefore(now.toLocalDate().atStartOfDay().plusHours(4))) {

				// 로그인 보상 포인트 설정
				Point point = new Point();
				point.setUserId(usersDTO.getUserId());
				point.setPointsAdded(20);
				point.setReason("출석 보상");

				// point_add 테이블에 데이터 삽입
				usersMapper.addPoint(point);

				// poinT_aggr 테이블 업데이트
				usersMapper.addOrUpdatePointsAggregate(usersDTO.getUserId());
			} // end inner if()

			// 로그인 시간 업데이트
			usersDTO.setLastLogin(now);
			usersMapper.updateLastLogin(usersDTO);
		} // end outer if

	}// end updateLastLogin()

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
