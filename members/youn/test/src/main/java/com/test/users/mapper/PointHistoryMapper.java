package com.test.users.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.test.users.dto.PointHistory;

@Mapper
public interface PointHistoryMapper {

	List<PointHistory> getPointHistory(int userId);

}
