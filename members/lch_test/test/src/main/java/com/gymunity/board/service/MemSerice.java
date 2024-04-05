package com.gymunity.board.service;

import org.springframework.web.bind.annotation.CrossOrigin;


import com.gymunity.board.dto.MemDTO;

@CrossOrigin("*")
public interface MemSerice {

	
	public void insertProcess(MemDTO dto);
	
	public void updateProcess(MemDTO dto);
}
