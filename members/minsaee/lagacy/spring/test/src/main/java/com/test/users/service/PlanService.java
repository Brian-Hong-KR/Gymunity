package com.test.users.service;

import java.io.IOException;
import java.util.List;

import com.test.users.dto.Survey;

public interface PlanService {
	List<Survey> findMatchingPlans(Survey formData) throws IOException;

}
