package com.test.users.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.test.users.dto.UsersDTO;

@Mapper
@Repository
public interface UsersRepository {

	public int insertUser(UsersDTO dto);
	public int insertProfile(UsersDTO dto);

	public UsersDTO selectByAccountId(String userAccountId);


	public void deleteUser(int userId);

}
