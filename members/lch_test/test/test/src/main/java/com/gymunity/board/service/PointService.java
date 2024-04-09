package com.gymunity.board.service;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymunity.board.dto.PointDTO;

@CrossOrigin("*")
public interface PointService {

	public void attendProcess(PointDTO dto);
}
