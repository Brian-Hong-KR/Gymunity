package com.gymunity.user.service;

import java.io.IOException;
import java.util.List;

import com.gymunity.user.dto.Survey;
import com.gymunity.user.response.PlanResponse;

public interface PlanService {
	public List<PlanResponse> findMatchingPlans(Survey formData) throws IOException;

}// end interface
