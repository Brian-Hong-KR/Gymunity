package com.test.users.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.users.dto.PointHistory;
import com.test.users.dto.PointHistoryDTO;
import com.test.users.mapper.PointHistoryMapper;

@Transactional
@Service
public class PointServiceImp implements PointService {

	
	@Autowired
    private PointHistoryMapper pointHistoryMapper;

    @Override
    public List<PointHistory> getPointHistory(int userId) {
        return pointHistoryMapper.getPointHistory(userId);
    }
}

    
