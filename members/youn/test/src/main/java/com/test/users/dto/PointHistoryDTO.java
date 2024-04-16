package com.test.users.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointHistoryDTO {
	private int userId;
    private int pointsSubtracted;
    private Date subtractedAt;
    private int pointsAdded;
    private Date addedAt;

}
