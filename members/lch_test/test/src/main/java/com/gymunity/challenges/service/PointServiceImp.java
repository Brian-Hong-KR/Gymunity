package com.gymunity.challenges.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.repository.MemRepository;
import com.gymunity.challenges.repository.PointRepository;

@Service
public class PointServiceImp implements PointService{

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
		MemDTO memDTO = new MemDTO();
		int bettingPoint = pointRepository.findTotalPoint(memDTO.getMem_user_id(), memDTO.getMem_ch_id());
		

		double archiveRate = pointRepository.findRate(memDTO.getMem_user_id(), memDTO.getMem_ch_id());
	
		int rewardPoints;
		
		 if (archiveRate >= 100) {
		        // 120% 포인트 부여
		        rewardPoints = (int) (archiveRate * 1.2);
		    } else if (archiveRate >= 80) {
		        // 60% 포인트 부여
		        rewardPoints = (int) (archiveRate * 0.6);
		    } else if (archiveRate >= 50) {
		        // 30% 포인트 부여
		        rewardPoints = (int) (archiveRate * 0.3);
		    } else {
		        // 보상 없음
		        rewardPoints = 0;
		    }
		 
		dto.setPoints_added(rewardPoints);	 	
		
		pointRepository.rewardPoint(dto);
		
	}


	
	
	
}
