package com.gymunity.board.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.gymunity.board.dto.PointDTO;

@Mapper
@Repository
public interface PointRepository {

		public void attendPoint(PointDTO dto);
}
