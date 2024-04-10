package com.gymunity.user.repository;

import com.gymunity.user.entity.User;

public interface SigninMapper {

	public User findUserByAccountId(String accountId);

	public void updateLastSignin(User dto);

}
