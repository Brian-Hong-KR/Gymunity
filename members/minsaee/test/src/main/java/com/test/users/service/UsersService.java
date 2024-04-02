package com.test.users.service;

import com.test.users.dto.AuthInfo;
import com.test.users.dto.UsersDTO;

public interface UsersService {
	
	public AuthInfo addUserProcess(UsersDTO dto);

}
