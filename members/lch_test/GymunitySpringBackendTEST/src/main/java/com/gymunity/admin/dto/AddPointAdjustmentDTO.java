package com.gymunity.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddPointAdjustmentDTO {
	private String userAccountId;
	private int pointsAdjusted;
	private String reason;

}
