package com.gymunity.point.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointAdjustAndSubtract {
    private int pointsAdjusted;
    private String reason;
    private int userId;
    private int pointsSubtracted;
    private String subtractedReason;
}