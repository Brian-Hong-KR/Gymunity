package com.test.users.service;

import com.test.users.dto.SignResponse;
import com.test.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);

	public SignResponse addUserProcess(UsersDTO dto);
	
	public UsersDTO viewUserProcess(String userAccounId);
	
	public void deleteUserProcess(int userId);

}
