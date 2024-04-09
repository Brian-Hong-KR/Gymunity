package com.gymunity.challenges.service;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymunity.challenges.dto.MemDTO;

@CrossOrigin("*")
public interface MemSerice {

	
	
	public void insertProcess(MemDTO dto);
	
	public void updateProcess(MemDTO dto);
	
	public void attendProcess(MemDTO dto);
}
