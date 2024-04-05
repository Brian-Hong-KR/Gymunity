package com.test.users.service;


import com.test.users.dto.SignResponse;
import com.test.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);
	public SignResponse addUserProcess(UsersDTO dto);

	public UsersDTO viewUserProcess(String userAccountId); // 회원정보 가져올 때
	public SignResponse updateUserProcess(UsersDTO dto); // 회원정보 수정
	public void deleteUserProcess(int userId); // 회원 삭제

}

