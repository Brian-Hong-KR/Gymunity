package com.gymunity.challenges.service;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymunity.challenges.dto.MemDTO;

@CrossOrigin("*")
public interface MemSerice {

	
	
	public void insertProcess(MemDTO dto);
	
	public void updateProcess(MemDTO dto);
	
	public void attendProcess(MemDTO dto);
	
	public MemDTO getMemberInfo(int mem_user_id);
	
	//public int findPProcess (int mem_user_id, int mem_ch_id);
	

}
