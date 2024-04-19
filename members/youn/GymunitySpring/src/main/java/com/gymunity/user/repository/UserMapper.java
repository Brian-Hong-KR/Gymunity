package com.gymunity.user.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.gymunity.user.dto.Profile;
import com.gymunity.user.dto.Survey;
import com.gymunity.user.dto.User;
import com.gymunity.user.dto.UserPointsWithinWeek;
import com.gymunity.user.dto.UserUpdateDTO;

@Mapper
@Repository
public interface UserMapper {
	public int insertUsers(User dto);

	public int insertProfiles(Profile dto);

	public int insertSurvey(Survey dto);

	public void updateUsers(UserUpdateDTO dto);

	public void updateProfiles(UserUpdateDTO dto);

	public void updateUserGradeName(int userId);

	public void updateLastLogin(User dto);

	public User selectUsersByAccountId(String accouintId);
	
	public User selectUsersByUserId(int userId);

	public Profile selectProfilesByUserId(int userId);

	public Profile selectPasswordByUserId(int userId);

	public int deleteUsers(int userId);

	List<UserPointsWithinWeek> getUserPointsWithinLastWeek(@Param("userId") String userId);
}// end interface
