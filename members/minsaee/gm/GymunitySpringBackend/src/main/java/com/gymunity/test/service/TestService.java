package com.gymunity.test.service;

import java.util.List;

import com.gymunity.test.dto.TestListDTO;
import com.gymunity.test.dto.TestPageDTO;

public interface TestService {
	
	public List<TestListDTO> listProcess(TestPageDTO pv);

}
