package com.gymunity.user.serviceimpl;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.point.service.PointService;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.Customer;
import com.gymunity.user.dto.CustomerDTO;
import com.gymunity.user.dto.Profile;
import com.gymunity.user.dto.Pt;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.Survey;
import com.gymunity.user.dto.User;
import com.gymunity.user.dto.UserInfoDTO;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.repository.UserMapper;
import com.gymunity.user.response.CustomerResponse;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.response.SignupResponse;
import com.gymunity.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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

		// pt 등록
		Pt pt = new Pt();
		pt.setUserId(user.getUserId());
		pt.setPlanName(dto.getPlanName());
		pt.setPlanDesc(dto.getPlanDesc());
		userMapper.insertPt(pt);

		PointAdd pointAdd = new PointAdd();
		pointAdd.setUserId(user.getUserId());
		pointAdd.setPointsAdded(400);
		pointAdd.setAddedReason("회원가입 보상");
		pointMapper.addPoint(pointAdd);

		// 회원포인트업데이트
		pointService.addOrUpdatePointsAggr(user.getUserId());

		return new SignupResponse(dto.getUserAccountId(), dto.getNickName(), dto.getUserEmail());
	}// end signupProcess()

	// 회원정보호출
		@Override
		public UserInfoDTO userInfoProcess(String userAccountId) {
			// userAccountId를 사용하여 User 정보 조회
			User user = userMapper.selectUsersByAccountId(userAccountId);
			if (user == null) {
				// 사용자 정보가 없으면 예외 처리
				throw new UsernameNotFoundException("User not found with accountId: " + userAccountId);
			}

			// user 객체의 userId를 사용하여 Profile 정보 조회
			Profile profile = userMapper.selectProfilesByUserId(user.getUserId());

			// User와 Profile 정보를 UserInfoDTO에 매핑
			UserInfoDTO userInfoDTO = new UserInfoDTO();
			userInfoDTO.setUserId(user.getUserId());
			userInfoDTO.setUserAccountId(user.getUserAccountId());
			userInfoDTO.setNickName(user.getNickName());
			userInfoDTO.setGradeName(user.getGradeName());
			userInfoDTO.setUserEmail(profile.getUserEmail());

			return userInfoDTO;
		}// UserInfoProcess()
	


	// 회원정보수정
	@Override
	public SigninResponse updateUserProcess(UserUpdateDTO dto) {
		// 변경된 비밀번호가 있다면 암호화하여 저장
		dto.encryptPassword(dto.getPassword(), passwordEncoder);

		// users 테이블 업데이트
		userMapper.updateUsers(dto);

		// profiles 테이블 업데이트
		userMapper.updateProfiles(dto);

		return new SigninResponse(dto.getNickName(), dto.getUserEmail());
	}// end updateUserProcess()

	// 회원탈퇴
	@Override
	public void deleteUserProcess(String userAccountId) {
		User user = userMapper.selectUsersByAccountId(userAccountId);

		if (user != null) {
			userMapper.deleteUsers(user.getUserId());
		}

	}// end deleteUserProcess()

	// Id,Password 확인
	@Override
	public boolean validateUserIdPassword(CheckUserIdPassword dto) {
		User user = userMapper.selectUsersByAccountId(dto.getUserAccountId());

		if (user != null) {
			Profile profile = userMapper.selectPasswordByUserId(user.getUserId());
			boolean isPasswordMatch = passwordEncoder.matches(dto.getPassword(), profile.getPassword());
			return isPasswordMatch;
		}
		return false;
	}

	@Override
	public CustomerResponse insertCustomerProcess(CustomerDTO dto, int userId) {
		
		Customer customer = new Customer();
		customer.setTitle(dto.getTitle());
		customer.setContent(dto.getContent());
		customer.setInquiryDate(dto.getInquiryDate());
		customer.setUserId(userId);
		userMapper.insertInquiries(customer);
		
		User user = userMapper.selectUsersByUserId(userId);
		
		CustomerResponse response = new CustomerResponse();
		response.setTitle(customer.getTitle());
		response.setContent(customer.getContent());
		
		return response;
	}// end validateUserIdPassword()
	
	

}// end class
