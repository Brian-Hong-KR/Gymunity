package com.gymunity.user.serviceimpl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.entity.PointAdd;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.user.entity.User;
import com.gymunity.user.repository.SigninMapper;
import com.gymunity.user.repository.UserMapper;
import com.gymunity.user.service.SigninService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SigninServiceImpl implements SigninService {
	private final UserMapper userMapper;
	private final SigninMapper signinMapper;
	private final PointMapper pointMapper;

	@Override
	public User getUserByAccountId(String userAccountId) {
		User user = signinMapper.findUserByAccountId(userAccountId);
		if (user != null) {
			// 현재 시간
			LocalDateTime now = LocalDateTime.now();

			// 마지막 로그인 시간 가져오기
			LocalDateTime lastSignin = user.getLastSignin();

			// 오늘 새벽 4시
			LocalDateTime today4am = now.toLocalDate().atStartOfDay().plusHours(4);
			// 20XX-XX-XXT04:00:00

			// 마지막 로그인 시간이 오늘 새벽 4시 이전이라면 보상을 지급
			if (lastSignin.isBefore(today4am)) {

				// 로그인 보상 포인트 설정
				PointAdd pointAdd = new PointAdd();
				pointAdd.setUserId(user.getUserId());
				pointAdd.setPointsAdded(20);
				pointAdd.setAddedReason("출석 보상");
				pointMapper.addPoint(pointAdd);
			} // end inner if()

			// 로그인 시간 업데이트
			user.setLastSignin(now);
			userMapper.updateLastLogin(user);

		} // end outer if()

		return userMapper.selectByAccountId(userAccountId);

	}// end getUserByAccountId()

}// end class
