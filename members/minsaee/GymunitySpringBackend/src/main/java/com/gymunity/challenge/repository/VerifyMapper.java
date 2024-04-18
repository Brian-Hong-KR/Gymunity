package com.gymunity.challenge.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.gymunity.challenge.dto.Verify;

@Mapper
@Repository
public interface VerifyMapper {

	public int insertVerify(Verify dto);

	public Verify selectVerifyByUserIdAndChId(@Param("userId") int userId, @Param("chId") int chId);
	
	public void updateVerify(Verify dto);

}// end interface
