package com.test.users.service;

import java.util.List;

import com.test.users.dto.PointHistory;


public interface PointService {

	List<PointHistory> getPointHistory(int userId);
}

