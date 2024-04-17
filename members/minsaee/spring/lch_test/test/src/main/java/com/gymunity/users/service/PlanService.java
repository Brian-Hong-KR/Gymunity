package com.gymunity.users.service;

import java.io.IOException;
import java.util.List;

import com.gymunity.users.dto.Survey;



public interface PlanService {
	List<Survey> findMatchingPlans(Survey formData) throws IOException;

}
