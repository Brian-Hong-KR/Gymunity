package com.gymunity.point.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointAdjustAddSubtract {
    private int pointsAdjusted;
    private String reason;
    private int userId;
    private int totalPoint;
    private int currentPoint;
    private int pointsAdded;
    private String addedReason;
    private int pointsSubtracted;
    private String subtractedReason;
}
