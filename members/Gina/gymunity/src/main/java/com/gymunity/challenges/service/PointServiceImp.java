package com.gymunity.challenges.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.repository.PointRepository;

@Service
public class PointServiceImp implements PointService{

	@Autowired
	private PointRepository pointRepository;
	
	public PointServiceImp() {
		
	}

	@Override
	public void attendProcess(PointDTO dto) {
		pointRepository.attendPoint(dto);
		
	}


	
	
	
}
