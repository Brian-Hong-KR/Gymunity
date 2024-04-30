package com.gymunity.admin.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.gymunity.admin.dto.UserDetails;
import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.challenge.dto.Verify;
import com.gymunity.user.dto.PointDetailDTO;

@Mapper
@Repository
public interface AdminMapper {
	public Verify selectVerifyByviId(int viId);

	public void updateResult(@Param("viId") int viId,@Param("result") String result);

	public int countSuccessfulVerifications(@Param("userId") int userId, @Param("chId") int chId);
	
	public void updateAchieveRate(@Param("userId") int userId, @Param("chId") int chId, @Param("achieveRate") double achieveRate);
	
	// 인증사진 확인
	public List<PhotoDTO> selectPhotosByResultN();
	
	// AARRR
	public List<LocalDate> selectAllSubmissions();
	
	public List<LocalDate> selectAllSignupDates();
	
	public List<LocalDate> selectAllSigninDates();
	
	public List<LocalDate> selectReferrerSignupDates();
	
	// 포인트 조회
	public List<PointDetailDTO> getPointsByUserAccountId(String userAccountId);

	// 회원 수정
	public int getUserIdByNickName(@Param("nickName") String nickName);
	
	public UserDetails getUserDetails(@Param("userId") int userId);
	
	public void updateNickName(@Param("userId") int userId, @Param("nickName") String nickName);
	
	public void updateIsActive(@Param("userId") int userId);
	
	public UserDetails Namecheck(String nickName);
}
