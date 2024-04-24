package com.gymunity.point.serviceimpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.point.dto.PointAdjustAddSubtract;
import com.gymunity.point.dto.PointAdjustAndAdd;
import com.gymunity.point.dto.PointAdjustAndSubtract;
import com.gymunity.point.repository.EditPointMapper;
import com.gymunity.point.service.EditPointService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EditPointServiceImpl implements EditPointService {

    @Autowired
    private EditPointMapper editPointMapper;

    @Override
    public int getUserIDByAccountID(String userAccountId) {
        return editPointMapper.getUserIDByAccountID(userAccountId);
    }

    @Override
    public List<Map<String, Object>> getPointsHistoryByUserID(int userId) {
        return editPointMapper.getPointsHistoryByUserID(userId);
    }

    @Override
    public void adjustPoints(PointAdjustAddSubtract dto) {
    	
    	PointAdjustAddSubtract pointAdjust = new PointAdjustAddSubtract();
    	pointAdjust.setPointsAdjusted(dto.getPointsAdjusted());
    	pointAdjust.setUserId(dto.getUserId());
    	pointAdjust.setReason(dto.getReason());
    	pointAdjust.setTotalPoint(dto.getTotalPoint());
    	pointAdjust.setCurrentPoint(dto.getCurrentPoint());
    	pointAdjust.setPointsAdded(dto.getPointsAdded());
    	pointAdjust.setAddedReason(dto.getAddedReason());
    	pointAdjust.setPointsSubtracted(dto.getPointsSubtracted());
    	pointAdjust.setSubtractedReason(dto.getSubtractedReason());
    	
    	
        int pointsAdjusted = dto.getPointsAdjusted();
        
        
        
        if (pointsAdjusted != 0) {
            if (pointsAdjusted > 0) {
                editPointMapper.insertPointAdjust(dto);
                editPointMapper.updateTotalPoints(dto);
                editPointMapper.insertPointAdd(dto);
            } else {
                editPointMapper.insertPointAdjust(dto);
                editPointMapper.updateCurrentPoints(dto);
                editPointMapper.insertPointSubtract(dto);
            }
        } else {
            throw new IllegalArgumentException("Adjustment points should be non-zero.");
        }
    }

}