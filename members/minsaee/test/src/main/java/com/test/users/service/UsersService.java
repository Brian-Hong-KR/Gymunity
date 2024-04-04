package com.test.users.service;

import com.test.users.dto.SignResponse;
import com.test.users.dto.UserDeleteRequest;
import com.test.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);

	public SignResponse addUserProcess(UsersDTO dto);
	
	public UsersDTO viewUserProcess(String userAccounId);
	
	// 유저의 아이디 비밀번호 확인 메서드
	boolean authenticateUser(UserDeleteRequest request);
	
	// 회원탈퇴 메서드
	void deleteUserByAccountId(String userAccountId);

}
