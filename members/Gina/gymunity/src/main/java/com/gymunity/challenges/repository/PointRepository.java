package com.gymunity.challenges.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.challenges.dto.PointDTO;

@Mapper
@Repository
public interface PointRepository {

		public void attendPoint(PointDTO dto);
}
