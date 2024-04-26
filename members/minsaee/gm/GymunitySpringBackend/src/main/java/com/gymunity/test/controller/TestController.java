package com.gymunity.test.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.test.dto.TestListDTO;
import com.gymunity.test.dto.TestPageDTO;
import com.gymunity.test.service.TestService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class TestController {
	
	private final TestService testService;
	
	@Operation(summary = "챌린지 리스트 가져오기")
	@GetMapping("/challenge/testlist")
    public List<TestListDTO> getTestList(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "9") int size) {
//        TestPageDTO testPageDTO = new TestPageDTO(page, size);
//        return testService.listProcess(testPageDTO);
		return null;
    }

}
