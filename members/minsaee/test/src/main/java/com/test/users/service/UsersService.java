package com.test.users.service;

import com.test.users.dto.SignResponse;
import com.test.users.dto.UsersDTO;

public interface UsersService {
	
	public SignResponse addUserProcess(UsersDTO dto);

}
