package com.test.users.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.test.users.dto.UsersDTO;

@Mapper
@Repository
public interface UsersRepository {
	
	public int insertUser(UsersDTO dto);
	public int insertProfile(UsersDTO dto);
	
	public UsersDTO selectByAccountId(String accountId);
	
	public void updateUsers(UsersDTO dto);
	
	public void updateProfiles(UsersDTO dto);
	
	public void deleteUser(int userId);

}

