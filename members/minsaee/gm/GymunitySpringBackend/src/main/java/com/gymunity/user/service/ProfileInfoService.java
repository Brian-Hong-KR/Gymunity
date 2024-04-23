package com.gymunity.user.service;

import com.gymunity.user.response.PointDetailResponse;
import com.gymunity.user.response.ProfileInfoResponse;

public interface ProfileInfoService {
	
	public ProfileInfoResponse getProfileInfoProcess(int userId);
	
	public PointDetailResponse getPointDetailProcess(int userId);

}// end interface
