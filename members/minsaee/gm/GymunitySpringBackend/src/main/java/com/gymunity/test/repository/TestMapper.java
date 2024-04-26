package com.gymunity.test.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.test.dto.TestListDTO;
import com.gymunity.test.dto.TestPageDTO;

@Mapper
@Repository
public interface TestMapper {
	public List<TestListDTO> testList(TestPageDTO pv);
	

}