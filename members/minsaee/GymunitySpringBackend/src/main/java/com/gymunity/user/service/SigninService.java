package com.gymunity.user.service;

import com.gymunity.user.dto.User;
import com.gymunity.user.response.SigninResponse;

public interface SigninService {

	public SigninResponse processSignIn(String userAccountId, String password);

	public SigninResponse generateAndReturnUserAuthTokens(String userAccountId);
}// end interface
