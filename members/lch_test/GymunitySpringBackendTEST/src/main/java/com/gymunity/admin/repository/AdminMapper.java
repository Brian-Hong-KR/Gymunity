package com.gymunity.admin.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.gymunity.challenge.dto.Verify;

@Mapper
@Repository
public interface AdminMapper {
	public Verify selectVerifyByviId(int viId);

	public void updateResult(@Param("viId") int viId,@Param("result") String result);

	public int countSuccessfulVerifications(@Param("userId") int userId, @Param("chId") int chId);
	
	public void updateAchieveRate(@Param("userId") int userId, @Param("chId") int chId, @Param("achieveRate") double achieveRate);

}
