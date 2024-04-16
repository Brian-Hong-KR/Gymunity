package com.gymunity.users.service;

import com.gymunity.users.dto.SignResponse;
import com.gymunity.users.dto.UserDeleteRequest;
import com.gymunity.users.dto.UserRegistrationDTO;
import com.gymunity.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);

	public SignResponse addUserProcess(UserRegistrationDTO dto);
	
	public UsersDTO viewUserProcess(String userAccountId);
	
	public void addOrUpdatePointsAggregate(int userId);
	
	// 회원정보수정
	public SignResponse updateMemberProcess(UsersDTO dto);
	
	// 유저의 아이디 비밀번호 확인
	boolean authenticateUser(UserDeleteRequest request);
	
	// 회원탈퇴
	void deleteUserByAccountId(String userAccountId);

}
