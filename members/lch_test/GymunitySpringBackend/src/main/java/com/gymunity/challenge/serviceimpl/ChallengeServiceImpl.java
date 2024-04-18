package com.gymunity.challenge.serviceimpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.dto.Member;
import com.gymunity.challenge.repository.ChallengeMapper;
import com.gymunity.challenge.service.ChallengeService;
import com.gymunity.point.dto.PointSubtract;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.point.service.PointService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeServiceImpl implements ChallengeService{
	
	private final ChallengeMapper challengeMapper;
	private final PointMapper pointMapper;
	private final PointService pointService;
	
	@Override
	public void createChallengeProcess(ChallengeCreateDTO dto, int userId) {
		
		// challenge 등록
		Challenge challenge = new Challenge();
		challenge.setTitle(dto.getTitle());
		challenge.setContent(dto.getContent());
		challenge.setCategory(dto.getCategory());
		challenge.setBettingPoint(dto.getBettingPoint());
		challenge.setProceed(dto.getPreceed());
		challenge.setChStartDate(dto.getChStartDate());
		challenge.setChEndDate(dto.getChEndDate());
		challenge.setUserId(userId);
		challengeMapper.insertChallenges(challenge);
		
		// member 등록
		Member member = new Member();
		member.setMemUserId(challenge.getUserId());
		member.setMemChId(challenge.getChId());
		challengeMapper.insertMembers(member);
		
		// point 차감 등록
		PointSubtract pointSubtract = new PointSubtract();
		pointSubtract.setUserId(member.getMemUserId());
		pointSubtract.setPointsSubtracted(challenge.getBettingPoint());
		pointSubtract.setSubtractedReason("챌린지 참가");
		pointMapper.subtractPoint(pointSubtract);
		
		// 회원 포인트 업데이트
		pointService.subtractOrUpdatePointsAggr(member.getMemUserId());
				
	}// end createChallengeProcess()

}//end class
