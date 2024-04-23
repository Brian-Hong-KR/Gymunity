package com.gymunity.point.serviceimpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.repository.PointMapper;
import com.gymunity.point.service.PointService;
import com.gymunity.user.repository.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PointServiceImpl implements PointService {

	private final UserMapper userMapper;
	private final PointMapper pointMapper;

	@Override
	public void addOrUpdatePointsAggr(int userId) {
		// points_aggr 업데이트
		pointMapper.addOrUpdatePointsAggr(userId);
		
		// grade_name 업데이트
		userMapper.updateUserGradeName(userId);

	}// end addOrUpdatePointsAggr()
	
	@Override
	public void subtractOrUpdatePointsAggr(int userId) {
		// point_aggr 업데이트
		pointMapper.subtractOrUpdatePointsAggr(userId);
		
		// grade_name 업데이트
		userMapper.updateUserGradeName(userId);
		
	}
}// end class
