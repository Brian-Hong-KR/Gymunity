package com.test.users.dto;


import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointHistory {
	
	 private int userId;
	    private int pointsSubtracted; // Nullable to accommodate NULL values
	    private Date subtractedAt;
	    private int pointsAdded;
	    private Date addedAt;

}
