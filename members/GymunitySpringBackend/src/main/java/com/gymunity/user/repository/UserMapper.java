package com.gymunity.user.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.user.entity.Profile;
import com.gymunity.user.entity.Survey;
import com.gymunity.user.entity.User;

@Mapper
@Repository
public interface UserMapper {
	public int insertUsers(User dto);

	public void updateUsers(User dto);

	public int insertProfiles(Profile dto);

	public void updateProfiles(Profile dto);

	public int insertSurvey(Survey dto);

	public void updateUserGradeName(int userId);

	public void updateLastLogin(User dto);
	
	public User selectByAccountId(String accouintId);

	public int deleteUsers(int userId);

}// end interface
