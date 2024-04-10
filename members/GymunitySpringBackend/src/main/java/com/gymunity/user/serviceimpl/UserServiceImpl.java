package com.gymunity.user.serviceimpl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.entity.PointAdd;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.entity.Profile;
import com.gymunity.user.entity.Survey;
import com.gymunity.user.entity.User;
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
	private final BCryptPasswordEncoder passwordEncoder;

	// 회원가입
	@Override
	public SignupResponse signupProcess(SignupDTO dto) {

		User user = dto.toUserEntity();
		userMapper.insertUsers(user);

		Profile profile = dto.toProfileEntity(user.getUserId());
		userMapper.insertProfiles(profile);

		Survey survey = dto.toSurveyEntity(user.getUserId());
		userMapper.insertSurvey(survey);

		PointAdd pointAdd = new PointAdd();
		pointAdd.setUserId(user.getUserId());
		pointAdd.setPointsAdded(400);
		pointAdd.setAddedReason("회원가입 보상");
		pointMapper.addPoint(pointAdd);

		return new SignupResponse(dto.getUserAccountId(), dto.getNickName(), dto.getUserEmail());
	}// end signupProcess()

	// 회원정보수정
	@Override
	public SigninResponse updateUserProcess(UserUpdateDTO dto) {
		User user = dto.toUserEntity();
		userMapper.updateUsers(user);

		Profile profile = dto.toProfileEntity(user.getUserId());
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
		User user = dto.toUserEntity();
		Profile profile = dto.toProfileEntity();

		user = userMapper.selectByAccountId(dto.getUserAccountId());

		if (user != null) {
			boolean isPasswordMatch = passwordEncoder.matches(dto.getPassword(), profile.getPassword());
			return isPasswordMatch;
		}
		return false;
	}// end validateUserIdPassword()

}// end class
