package com.gymunity.users.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Point {
	private int userId;
	private int pointsAdded;
	private int pointsSubtracted;
	private String reason;

}
