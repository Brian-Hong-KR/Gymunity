package com.gymunity.challenges.service;

import org.springframework.web.bind.annotation.CrossOrigin;


import com.gymunity.challenges.dto.VerifyDTO;

@CrossOrigin("*")
public interface VerifyService {
	

	public void verifyProcess(VerifyDTO dto);
	
	public void updateMemProcess(VerifyDTO dto);
}
