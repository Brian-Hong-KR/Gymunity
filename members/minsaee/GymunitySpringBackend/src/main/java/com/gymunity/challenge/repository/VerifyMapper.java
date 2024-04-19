package com.gymunity.challenge.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.challenge.dto.Verify;

@Mapper
@Repository
public interface VerifyMapper {

	public int insertVerify(Verify dto);

	public Verify selectVerifyByUserIdAndChId(@Param("userId") int userId, @Param("chId") int chId);

	public int countVerifiesThisWeek(@Param("userId") int userId, @Param("chId") int chId,
			@Param("startOfWeek") LocalDateTime startOfWeek, @Param("endOfWeek") LocalDateTime endOfWeek);

	public void updateVerify(Verify dto);

	public List<PhotoDTO> selectPhotosByUserId(int userId);

}// end interface
