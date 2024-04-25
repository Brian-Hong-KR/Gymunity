package com.gymunity.challenge.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class VerifyController {
	
	@Value("${react.public.verify}") // application.properties에서 파일 저장 위치를 가져와 변수에 할당합니다.
    private String filePath;

}
