package com.gymunity.user.service;

import com.gymunity.user.response.SigninResponse;

public interface SigninService {

	public SigninResponse processSignIn(String userAccountId, String password);

	public SigninResponse generateAndReturnUserAuthTokens(Integer userId);
}// end interface
