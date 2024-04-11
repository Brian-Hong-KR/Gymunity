package com.gymunity.users.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.users.dto.Point;
import com.gymunity.users.dto.Survey;
import com.gymunity.users.dto.UsersDTO;



@Mapper
@Repository
public interface UsersMapper {
	
	public int insertUser(UsersDTO dto);
	public int insertProfile(UsersDTO dto);
	public int insertSurvey(Survey dto);
//	public int insertPt(Survey dto); // pt TABLE 삽입
	public int addPoint(Point dto);
	public int addOrUpdatePointsAggregate(int userId);
	public int subtractPoint(Point dto);
	
	public UsersDTO selectByAccountId(String accountId);
	
	public void updateUsers(UsersDTO dto);
	public void updateProfiles(UsersDTO dto);
	
	public int deleteUser(int userId);

}
