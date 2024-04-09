package com.gymunity.challenges.service;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymunity.challenges.dto.PointDTO;

@CrossOrigin("*")
public interface PointService {

	public void attendProcess(PointDTO dto);
}
