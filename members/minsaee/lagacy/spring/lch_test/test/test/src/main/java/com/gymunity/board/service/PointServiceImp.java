package com.gymunity.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.board.dto.PointDTO;
import com.gymunity.board.repository.PointRepository;

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
