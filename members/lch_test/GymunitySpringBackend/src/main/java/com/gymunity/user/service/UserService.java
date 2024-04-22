package com.gymunity.user.service;

import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.response.SignupResponse;

public interface UserService {

	public SignupResponse signupProcess(SignupDTO dto);

	public SigninResponse updateUserProcess(UserUpdateDTO dto);

	public boolean validateUserIdPassword(CheckUserIdPassword dto);

	public void deleteUserProcess(String userAccountId);

}// end interface
