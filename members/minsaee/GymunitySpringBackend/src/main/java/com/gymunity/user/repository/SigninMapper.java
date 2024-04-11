package com.gymunity.user.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.user.dto.User;

@Mapper
@Repository
public interface SigninMapper {

	public User findUserByAccountId(String accountId);

	public void updateLastSignin(User dto);

}
