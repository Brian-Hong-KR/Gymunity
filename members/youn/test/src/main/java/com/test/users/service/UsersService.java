package com.test.users.service;


import com.test.users.dto.SignResponse;
import com.test.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);
	public SignResponse addUserProcess(UsersDTO dto); 
	
	public UsersDTO viewUserProcess(String userAccountId); // 회원정보 가져올 때

	public void deleteUserProcess(String userAccountId); // 회원 삭제

}

