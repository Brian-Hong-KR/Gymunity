package com.test.users.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.users.dto.Survey;

import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;

//@Slf4j
//@Transactional
@RequiredArgsConstructor
@Service
public class PlanServiceImp implements PlanService {

	// 리소스를 로드하기 위해 사용함
	private final ResourceLoader resourceLoader;

	// formData에 해당하는 설문 결과를 찾아 반환하는 메서드
	@Override
	public List<Survey> findMatchingPlans(Survey formData) throws IOException {
		// 클래스패스에 위치한 파일 로드
		Resource resource = resourceLoader.getResource("classpath:pt_plan.json");

		// JSON -> Java 객체로 변환
		ObjectMapper mapper = new ObjectMapper();

		// JSON 파일의 내용을 Survey 객체의 리스트로 변환
		List<Survey> plans = mapper.readValue(resource.getInputStream(), new TypeReference<List<Survey>>() {
		});

		// 변환된 리스트에서 formData와 일치하는 Survey 객체만 필터링하여 반환
		return plans.stream().filter(Survey -> Survey.matches(formData)).collect(Collectors.toList());
	}// end findMatchingPlans

}// end class
