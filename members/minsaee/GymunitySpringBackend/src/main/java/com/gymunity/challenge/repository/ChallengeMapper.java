package com.gymunity.challenge.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.Member;

@Mapper
@Repository
public interface ChallengeMapper {
	public int insertChallenges(Challenge dto);

	public int insertMembers(Member dto);

}// end class
