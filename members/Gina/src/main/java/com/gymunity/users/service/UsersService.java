package com.gymunity.users.service;

import com.gymunity.users.dto.SignResponse;
import com.gymunity.users.dto.UsersDTO;

public interface UsersService {

	public SignResponse getByUserAccountId(String userAccountId);

	public SignResponse addUserProcess(UsersDTO dto);
	
	public UsersDTO viewUserProcess(String userAccounId);

}
