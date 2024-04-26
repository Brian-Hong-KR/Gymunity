package com.gymunity.user.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.user.dto.Customer;
import com.gymunity.user.dto.Profile;
import com.gymunity.user.dto.Pt;
import com.gymunity.user.dto.Survey;
import com.gymunity.user.dto.User;
import com.gymunity.user.dto.UserUpdateDTO;

@Mapper
@Repository
public interface UserMapper {
	public int insertNewVisit();
	
	public int insertUsers(User dto);

	public int insertProfiles(Profile dto);

	public int insertSurvey(Survey dto);
	
	public int insertPt(Pt dto);

	public void updateUsers(UserUpdateDTO dto);

	public void updateProfiles(UserUpdateDTO dto);

	public void updateUserGradeName(int userId);

	public void updateLastLogin(User dto);

	public User selectUsersByAccountId(String accouintId);
	
	public User selectUsersByUserId(int userId);

	public Profile selectProfilesByUserId(int userId);

	public Profile selectPasswordByUserId(int userId);

	public int deleteUsers(int userId);
	
	public User selectSurveyByUserId(int userId);
	
	public int insertInquiries(Customer dto);
	
	public List<Customer> selectInquiries();
	
	public int Idcheck(String userAccountId);
	
	public void updateSurvey(Survey dto);
	
	public void updatePt(Pt dto);

}// end interface
