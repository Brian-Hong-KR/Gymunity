package com.gymunity.point.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointAdjustAndAdd {
    private int pointsAdjusted;
    private String reason;
    private int userId;
    private int pointsAdded;
    private String addedReason;
}
