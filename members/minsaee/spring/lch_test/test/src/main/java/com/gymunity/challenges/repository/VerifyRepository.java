package com.gymunity.challenges.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.VerifyDTO;

@Mapper
@Repository
public interface VerifyRepository {

	
	public void verph(VerifyDTO dto);

	public void updateMemRate(VerifyDTO dto);
}
