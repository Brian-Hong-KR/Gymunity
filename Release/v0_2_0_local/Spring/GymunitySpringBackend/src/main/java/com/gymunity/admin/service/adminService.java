package com.gymunity.admin.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.gymunity.admin.dto.AddPointAdjustmentDTO;
import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.user.response.PointDetailResponse;

public interface adminService {
	
	public void verifyCheckProcess(int viId, String result);
	
	public List<PhotoDTO> getPhotosByResultNProcess();
	
	public Map<String, Integer> countByWeek(List<LocalDate> dates);
	
	public Map<String, Integer> countSubmissionsByWeek();
	
	public Map<String, Integer> countAllSignUpByWeek();
	
	public Map<String, Integer> countAllSignInByWeek();
	
	public Map<String, Integer> countReferrerSignUpByWeek();
	
	public Map<String, Map<String, Integer>> getAllDataByWeek();
	
	public PointDetailResponse getPointsProcess(String userAccountId);
	
	public void insertOrUpdateadjustPointsProcess(AddPointAdjustmentDTO dto);
	

}// end interface
