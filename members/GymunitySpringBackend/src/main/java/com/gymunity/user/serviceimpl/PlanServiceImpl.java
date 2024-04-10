package com.gymunity.user.serviceimpl;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymunity.user.dto.SurveyData;
import com.gymunity.user.entity.Survey;
import com.gymunity.user.response.PlanResponse;
import com.gymunity.user.service.PlanService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PlanServiceImpl implements PlanService {

	// 리소스를 로드하기 위해 사용함
	private final ResourceLoader resourceLoader;

	@Override
	public List<PlanResponse> findMatchingPlans(Survey formData) throws IOException {
		// 클래스패스에 위치한 파일 로드
		Resource resource = resourceLoader.getResource("classpath:pt_plan.json");

		// JSON -> Java 객체로 변환 (SurveyData 객체를 사용)
		ObjectMapper mapper = new ObjectMapper();
		List<SurveyData> surveyDataList = mapper.readValue(resource.getInputStream(),
				new TypeReference<List<SurveyData>>() {
				});

		// 변환된 리스트에서 formData와 일치하는 SurveyData 객체만 필터링하고, PlanResponse로 변환하여 반환
		return surveyDataList.stream().filter(surveyData -> matchesSurvey(surveyData, formData))
				.map(surveyData -> new PlanResponse(surveyData.getPlanName(), surveyData.getPlanDesc()))
				.collect(Collectors.toList());

	}// end findMatchingPlans

	// SurveyData 객체와 Survey 객체가 일치하는지 검사하는 메소드
	private boolean matchesSurvey(SurveyData surveyData, Survey survey) {
		return surveyData.getGender().equals(survey.getGender()) && surveyData.getAge().equals(survey.getAge())
				&& surveyData.getGoal().equals(survey.getGoal()) && surveyData.getLevel().equals(survey.getLevel())
				&& surveyData.getAbnormal().equals(survey.getAbnormal());
	}// end matchesSurvey()

}// end class
