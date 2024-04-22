package com.gymunity.user.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.user.dto.PointDetailDTO;
import com.gymunity.user.dto.ProfileInfoChallengeDTO;
import com.gymunity.user.dto.ProfileInfoDTO;
import com.gymunity.user.dto.WeeklyPointsDTO;
import com.gymunity.user.repository.ProfileInfoMapper;
import com.gymunity.user.response.PointDetailResponse;
import com.gymunity.user.response.ProfileInfoResponse;
import com.gymunity.user.service.ProfileInfoService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileInfoServiceImpl implements ProfileInfoService {
	
	private final ProfileInfoMapper profileinfoMapper;

	// 마이페이지
	@Override
	public ProfileInfoResponse getProfileInfoProcess(int userId) {
		ProfileInfoResponse response = new ProfileInfoResponse();

		// 기본 정보 가져오기
		ProfileInfoDTO basicInfo = profileinfoMapper.selectBasicInfo(userId);
		if (basicInfo != null) {
			response.setNickName(basicInfo.getNickName());
			response.setUserEmail(basicInfo.getUserEmail());
			response.setGradeName(basicInfo.getGradeName());
			response.setCurrentPoints(basicInfo.getCurrentPoints());
			response.setPlanName(basicInfo.getPlanName());
		}

		// 다음 등급까지 남은 포인트 가져오기
		Integer pointsToNextGrade = profileinfoMapper.getPointsToNextGrade(userId);
		if (pointsToNextGrade != null) {
			response.setPointToNextGrade(pointsToNextGrade);
		}

		// 모집중, 진행중 챌린지 가져오기
		List<ProfileInfoChallengeDTO> challenges = profileinfoMapper.selectRecOrPrChallnege(userId);
		response.setChallenges(challenges);

		// 요일별 포인트 합계 가져오기
		List<WeeklyPointsDTO> weeklyPoints = profileinfoMapper.getWeeklyNetPoints(userId);
		response.setWeeklyPoints(weeklyPoints);

		return response;
	}// end getProfileInfo()
	
	// 포인트 상세페이지
	@Override
	public PointDetailResponse getPointDetailProcess(int userId) {
		
		PointDetailResponse response = new PointDetailResponse();
		
		List<PointDetailDTO> dto = profileinfoMapper.getPointDetail(userId);
		response.setDetails(dto);
		
		return response;
	}
}// end class
