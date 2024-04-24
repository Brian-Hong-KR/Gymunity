package com.gymunity.admin.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface adminService {
	
	public void verifyCheckProcess(int viId, String result);
	
	public Map<String, Integer> countByWeek(List<LocalDate> dates);
	
	public Map<String, Integer> countSubmissionsByWeek();
	
	public Map<String, Integer> countAllSignUpByWeek();
	
	public Map<String, Integer> countReferrerSignupByWeek();
	
	public Map<String, Map<String, Integer>> getAllDataByWeek();
	

}// end interface
