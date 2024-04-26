package com.gymunity.test.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.test.dto.TestListDTO;
import com.gymunity.test.dto.TestPageDTO;
import com.gymunity.test.repository.TestMapper;
import com.gymunity.test.service.TestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TestServiceImpl implements TestService{
	private final TestMapper testMapper;
	
	@Override
		public List<TestListDTO> listProcess(TestPageDTO pv) {
			return testMapper.testList(pv);
		}

}
