package com.gymunity.user.serviceimpl;

import java.time.LocalDateTime;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.point.service.PointService;
import com.gymunity.redis.TokenService;
import com.gymunity.security.jwt.JwtProperties;
import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.user.dto.Profile;
import com.gymunity.user.dto.User;
import com.gymunity.user.repository.SigninMapper;
import com.gymunity.user.repository.UserMapper;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.service.SigninService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SigninServiceImpl implements SigninService {
	private final UserMapper userMapper;
	private final SigninMapper signinMapper;
	private final PointMapper pointMapper;
	private final PasswordEncoder passwordEncoder;
	private final TokenService tokenService;
	private final PointService pointService;

	// 로그인 프로세스
	@Override
	public SigninResponse processSignIn(String userAccountId, String password) {
		// 사용자 정보 조회
		User user = signinMapper.findUserByAccountId(userAccountId);
		if (user != null) {
			// DB 비밀번호 조회하기
			Profile profile = userMapper.selectPasswordByUserId(user.getUserId());
			if (!passwordEncoder.matches(password, profile.getPassword())) {
				throw new BadCredentialsException("Invalid password");
			} else {
				// 현재 시간
				LocalDateTime now = LocalDateTime.now();

				// 마지막 로그인 시간 가져오기
				LocalDateTime lastSignin = user.getLastSignin();
				log.info("DB로그인시간 {}", lastSignin);

				// 오늘 새벽 4시
				LocalDateTime today4am = now.toLocalDate().atStartOfDay().plusHours(4);

				// 현재 시간이 새벽 4시 이전이면, '오늘'의 기준을 전날의 새벽 4시로 설정
				if (now.isBefore(today4am)) {
					today4am = today4am.minusDays(1);
				}

				// 마지막 로그인 시간이 오늘 새벽 4시 이전이라면 보상을 지급
				if (lastSignin == null || lastSignin.isBefore(today4am)) {

					// 로그인 보상 포인트 설정
					PointAdd pointAdd = new PointAdd();
					pointAdd.setUserId(user.getUserId());
					pointAdd.setPointsAdded(20);
					pointAdd.setAddedReason("출석 보상");
					pointMapper.addPoint(pointAdd);

					// 회원포인트업데이트
					pointService.addOrUpdatePointsAggr(user.getUserId());
				} // end inner if()

				// 로그인 시간 업데이트
				user.setLastSignin(now);
				signinMapper.updateLastSignin(user);

				// 토큰 생성 및 저장
				String accessToken = JwtProperties.TOKEN_PREFIX + JwtProvider.createAccessToken(user.getUserId(), user.getAdminYn());
				String refreshToken = JwtProvider.createRefreshToken(user.getUserId(), user.getAdminYn());

				// redis 저장
				tokenService.saveTokens(user.getUserAccountId(), accessToken, refreshToken);

				return SigninResponse.builder().userId(user.getUserId()).userAccountId(user.getUserAccountId())
						.nickName(user.getNickName()).adminYn(user.getAdminYn()).accessToken(accessToken).refreshToken(refreshToken).build();
			}

		} else {
			throw new UsernameNotFoundException("아이디가 틀립니다" + userAccountId);
		}

	}// end getUserByAccountId()

	// JwtTokenFilter
	@Override
	public SigninResponse getByUserId(Integer userId) {
		User user = signinMapper.selectUsersByUserId(userId);

		return SigninResponse.builder().userAccountId(user.getUserAccountId()).userId(user.getUserId())
				.nickName(user.getNickName()).accessToken(JwtProvider.createAccessToken(userId, user.getAdminYn()))
				.refreshToken(JwtProvider.createRefreshToken(userId, user.getAdminYn())).build();
	}// end getByUserId()

	// 토큰생성 프로세스
	@Override
	public SigninResponse generateAndReturnUserAuthTokens(Integer userId) {
		User user = signinMapper.selectUsersByUserId(userId);

		String accessToken = JwtProvider.createAccessToken(userId, user.getAdminYn());
		String refreshToken = JwtProvider.createRefreshToken(userId, user.getAdminYn());

		return SigninResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
	}// end generateAndReturnUserAuthTokens()

	// 정보 조회하기

}// end class
