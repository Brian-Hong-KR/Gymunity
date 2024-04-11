package com.gymunity.user.serviceimpl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.point.service.PointService;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.Profile;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.Survey;
import com.gymunity.user.dto.User;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.repository.UserMapper;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.response.SignupResponse;
import com.gymunity.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserMapper userMapper;
	private final PointMapper pointMapper;
	private final PasswordEncoder passwordEncoder;
	private final PointService pointService;

	// 회원가입
	@Override
	public SignupResponse signupProcess(SignupDTO dto) {

		// user 등록
		User user = new User();
		user.setUserAccountId(dto.getUserAccountId());
		user.setNickName(dto.getNickName());
		userMapper.insertUsers(user);

		// 비밀번호 암호화
		String encodedPassword = passwordEncoder.encode(dto.getPassword());

		// profile 등록
		Profile profile = new Profile();
		profile.setUserId(user.getUserId());
		profile.setPassword(encodedPassword);
		profile.setUserEmail(dto.getUserEmail());
		userMapper.insertProfiles(profile);

		// survey 등록
		Survey survey = new Survey();
		survey.setUserId(user.getUserId());
		survey.setGender(dto.getGender());
		survey.setAge(dto.getAge());
		survey.setGoal(dto.getGoal());
		survey.setLevel(dto.getLevel());
		survey.setAbnormal(dto.getAbnormal());
		userMapper.insertSurvey(survey);

		PointAdd pointAdd = new PointAdd();
		pointAdd.setUserId(user.getUserId());
		pointAdd.setPointsAdded(400);
		pointAdd.setAddedReason("회원가입 보상");
		pointMapper.addPoint(pointAdd);

		// 회원포인트업데이트
		pointService.addOrUpdatePointsAggr(user.getUserId());

		return new SignupResponse(dto.getUserAccountId(), dto.getNickName(), dto.getUserEmail());
	}// end signupProcess()

	// 회원정보수정
	@Override
	public SigninResponse updateUserProcess(UserUpdateDTO dto) {
		User user = new User();
		user.setNickName(dto.getNickName());
		userMapper.updateUsers(user);

		Profile profile = new Profile();
		profile.setUserEmail(dto.getUserEmail());
		userMapper.updateProfiles(profile);

		return new SigninResponse(dto.getNickName(), dto.getUserEmail());
	}// end updateUserProcess()

	// 회원탈퇴
	@Override
	public void deleteUserProcess(String userAccountId) {
		User user = userMapper.selectByAccountId(userAccountId);

		if (user != null) {
			userMapper.deleteUsers(user.getUserId());
		}

	}// end deleteUserProcess()

	// Id,Password 확인
	@Override
	public boolean validateUserIdPassword(CheckUserIdPassword dto) {
		User user = userMapper.selectByAccountId(dto.getUserAccountId());

		if (user != null) {
			Profile profile = userMapper.selectPasswordByUserId(user.getUserId());
			boolean isPasswordMatch = passwordEncoder.matches(dto.getPassword(), profile.getPassword());
			return isPasswordMatch;
		}
		return false;
	}// end validateUserIdPassword()

}// end class
