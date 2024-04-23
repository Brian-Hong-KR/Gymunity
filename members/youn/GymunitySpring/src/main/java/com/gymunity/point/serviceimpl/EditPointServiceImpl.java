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
    public void adjustPoints(PointAdjustAddSubtract pointAdjustAddSubtract) {
        int pointsAdjusted = pointAdjustAddSubtract.getPointsAdjusted();
        if (pointsAdjusted != 0) {
            if (pointsAdjusted > 0) {
                // 양수인 경우
                PointAdjustAndAdd pointAdjustAndAdd = new PointAdjustAndAdd();
                pointAdjustAndAdd.setPointsAdjusted(pointsAdjusted);
                pointAdjustAndAdd.setReason(pointAdjustAddSubtract.getReason());
                pointAdjustAndAdd.setUserId(pointAdjustAddSubtract.getUserId());
                pointAdjustAndAdd.setPointsAdded(pointsAdjusted);
                pointAdjustAndAdd.setAddedReason(pointAdjustAddSubtract.getAddedReason());
                editPointMapper.adjustAndAddPoints(pointAdjustAndAdd);
            } else {
                // 음수인 경우
                PointAdjustAndSubtract pointAdjustAndSubtract = new PointAdjustAndSubtract();
                pointAdjustAndSubtract.setPointsAdjusted(pointsAdjusted);
                pointAdjustAndSubtract.setReason(pointAdjustAddSubtract.getReason());
                pointAdjustAndSubtract.setUserId(pointAdjustAddSubtract.getUserId());
                pointAdjustAndSubtract.setPointsSubtracted(-pointsAdjusted); // 음수로 변환
                pointAdjustAndSubtract.setSubtractedReason(pointAdjustAddSubtract.getSubtractedReason());
                editPointMapper.adjustAndSubtractPoints(pointAdjustAndSubtract);
            }
        } else {
            // 0인 경우
            throw new IllegalArgumentException("Adjustment points should be non-zero.");
        }
    }

}