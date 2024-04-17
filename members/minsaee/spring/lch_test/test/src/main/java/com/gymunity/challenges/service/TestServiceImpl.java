package com.gymunity.challenges.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.repository.TestMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TestServiceImpl implements TestService{
	private final TestMapper testMapper;
	
	@Override
	public PointDTO testprocess(int mem_id) {

		// mem_id를 이용해서 mem 정보 조회
	    MemDTO mem = testMapper.selectMembymem_id(mem_id);
	    if (mem == null) {
	        // 여기에 적절한 예외 처리나 로그 기록
	        throw new IllegalArgumentException("멤버 정보가 없습니다.");
	    }

	    // memDTO mem_id를 이용해 ch 정보 조회
	    ChallengeDTO ch = testMapper.selectChbymem_ch_id(mem.getMem_ch_id());
	    if (ch == null) {
	        // 챌린지 정보가 없는 경우의 처리
	        throw new IllegalArgumentException("챌린지 정보가 없습니다.");
	    }
		
		
		int batting_point = ch.getBatting_point(); // 배팅포인트
		

		double archiveRate = mem.getArchive_rate(); // 성공률
		log.info("archiveRate: {}", archiveRate);
	
		int rewardPoints;
		
		 if (archiveRate >= 100) {
		        // 120% 포인트 부여
		        rewardPoints = (int) (batting_point  * 1.2);
		    } else if (archiveRate >= 80) {
		        // 60% 포인트 부여
		        rewardPoints = (int) (batting_point  * 0.6);
		    } else if (archiveRate >= 50) {
		        // 30% 포인트 부여
		        rewardPoints = (int) (batting_point  * 0.3);
		    } else if (archiveRate >= 10) {
		        // 새 조건: archiveRate가 10 이상이면 10% 포인트 부여
		        rewardPoints = (int) (batting_point * 0.1);
		    } else {
		        // 보상 없음
		        rewardPoints = 0;
		    }
		 
		// rewardPoint 삽입
		 PointDTO pointdto = new PointDTO();
		 // 멤버에서 유저아이디 가져오기
		 pointdto.setUser_id(mem.getMem_user_id());
		 pointdto.setPoints_added(rewardPoints);
		 pointdto.setAdded_reason("챌린지 보상");
		 testMapper.addPoint(pointdto);
		 
		 testMapper.addOrUpdatePointsAggr(mem.getMem_user_id());
		 
		 
		return null; 
	
	}
	
	

}
