package com.gymunity.point.serviceimpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.dto.PointAdjust;
import com.gymunity.point.dto.PointSubtract;
import com.gymunity.point.repository.EditPointMapper;
import com.gymunity.point.service.EditPointService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EditPointServiceImpl implements EditPointService {

    @Autowired
    private EditPointMapper adminEditPointMapper;

    @Override
    public int getUserIDByAccountID(String userAccountId) {
        return adminEditPointMapper.getUserIDByAccountID(userAccountId);
    }

    @Override
    public List<Map<String, Object>> getPointsHistoryByUserID(int userId) {
        return adminEditPointMapper.getPointsHistoryByUserID(userId);
    }

    @Override
    public void adjustPoints(PointAdjust pointAdjust) {
        if (pointAdjust.getPointsAdjusted() > 0) {
            adjustPointsPositive(pointAdjust);
        } else if (pointAdjust.getPointsAdjusted() < 0) {
            adjustPointsNegative(pointAdjust);
        } else {
            throw new IllegalArgumentException("Invalid adjustment type. Points adjusted should be either positive or negative.");
        }
    }

    private void adjustPointsPositive(PointAdjust pointAdjust) {
        adminEditPointMapper.adjustPointsPositive(pointAdjust);
    }

    private void adjustPointsNegative(PointAdjust pointAdjust) {
        adminEditPointMapper.adjustPointsNegative(pointAdjust);
    }

    @Override
    public void addPoints(PointAdd pointAdd) {
        adminEditPointMapper.addPoints(pointAdd);
    }
    
    @Override
    public void subtractPoints(PointSubtract pointSubtract) {
        adminEditPointMapper.subtractPoints(pointSubtract);
    }
}