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
		memRepository.savemem(dto);
		
	}

	@Override
	public void updateProcess(MemDTO dto) {
		memRepository.updateP(dto);
		
	}
	
	
	
}
