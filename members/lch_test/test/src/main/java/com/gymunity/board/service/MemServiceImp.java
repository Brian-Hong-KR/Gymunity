package com.gymunity.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymunity.board.dto.MemDTO;
import com.gymunity.board.repository.MemRepository;

@Service
public class MemServiceImp implements MemSerice{
	
	@Autowired
	private MemRepository memRepository;
	
	public MemServiceImp() {
		
	}

	@Override
	public void insertProcess(MemDTO dto) {
		// 챌린지 생성시
		
		memRepository.writemem(dto);
		
	}

	@Override
	public void attendProcess(MemDTO dto) {
		// 챌린지 참가시
		memRepository.savemem(dto);
		
	}

	@Override
	public void updateProcess(MemDTO dto) {
		memRepository.updateP(dto);
		
	}
	
	
	
}
