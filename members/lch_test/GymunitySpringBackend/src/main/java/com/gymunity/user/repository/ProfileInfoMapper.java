package com.gymunity.user.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.user.dto.PointDetailDTO;
import com.gymunity.user.dto.ProfileInfoChallengeDTO;
import com.gymunity.user.dto.ProfileInfoDTO;
import com.gymunity.user.dto.WeeklyPointsDTO;

@Mapper
@Repository
public interface ProfileInfoMapper {
	// 현재 등급, 현재 포인트, 현재 플랜 네임
	public ProfileInfoDTO selectBasicInfo(int userId);
	
	// 다음 등급까지 남은 포인트
	public Integer getPointsToNextGrade(int userId);
	
	// 현재 모집,진행중인 챌린지 이름과 카테고리
	public List<ProfileInfoChallengeDTO> selectRecOrPrChallnege(int userId);
	
	// 요일별 얻고 잃은 포인트 합계
	public List<WeeklyPointsDTO> getWeeklyNetPoints(int userId);
	
	// 포인트 상세페이지
	public List<PointDetailDTO> getPointDetail(int userId);
	

}// end interface
