package com.gymunity.challenges.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.repository.MemRepository;
import com.gymunity.challenges.repository.PointRepository;



@Service
public class PointServiceImp implements PointService{

	 private static final Logger logger = LoggerFactory.getLogger(PointServiceImp.class);
	 
	@Autowired
	private PointRepository pointRepository;
	
	@Autowired
	private MemRepository memRepository;
	
	
	public PointServiceImp() {
		
	}

	@Override
	public void attendProcess(PointDTO dto) {
		pointRepository.attendPoint(dto);
		
	}

	// 챌린지 보상
	@Override
	public void rewardProcess(PointDTO dto) {	
		 int memUserId = dto.getMem_user_id();
		    int memChId = dto.getMem_ch_id();

		    Map<String, Object> params = new HashMap<>();
		    params.put("mem_user_id", memUserId); // mem_user_id_value는 실제 사용자 ID입니다.
		    params.put("mem_ch_id", memChId); // mem_ch_id_value는 실제 챌린지 ID입니다.

		    // MyBatis 쿼리 실행
		    PointDTO resultDTO = pointRepository.findRate(params);


		        // 챌린지 보상 계산
		        int bettingPoint = resultDTO.getBattingPoint();
		        double archiveRate = resultDTO.getArchiveRate();
		        logger.debug("Betting point: {}", archiveRate);
		        int rewardPoints;

		        if (archiveRate >= 100) {
		            // 120% 포인트 부여
		            rewardPoints = (int) (bettingPoint * 1.2);
		        } else if (archiveRate >= 80) {
		            // 80% 포인트 부여
		            rewardPoints = (int) (bettingPoint * 0.8);
		        } else if (archiveRate >= 50) {
		            // 50% 포인트 부여
		            rewardPoints = (int) (bettingPoint * 0.5);
		        } else {
		            // 보상 없음
		            rewardPoints = 0;
		        }

		        dto.setPoints_added(rewardPoints);     
		        
		        pointRepository.rewardPoint(dto);
	        
	   

		
	}


	
	
	
}
