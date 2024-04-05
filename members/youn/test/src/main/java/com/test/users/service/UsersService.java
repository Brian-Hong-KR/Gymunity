package com.test.users.service;

import com.test.users.dto.SignResponse;
import com.test.users.dto.UserDeleteRequest;
import com.test.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);

	public SignResponse addUserProcess(UsersDTO dto);
	
	public UsersDTO viewUserProcess(String userAccounId);
	
	// 회원정보수정
	public SignResponse updateMemberProcess(UsersDTO dto);
	
	// 유저의 아이디 비밀번호 확인
	boolean authenticateUser(UserDeleteRequest request);
	
	// 회원탈퇴
	void deleteUserByAccountId(String userAccountId);

}
