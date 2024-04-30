package com.gymunity.admin.serviceimpl;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.admin.dto.AdminEditUserDTO;
import com.gymunity.admin.dto.UserDetails;
import com.gymunity.admin.dto.AddPointAdjustmentDTO;
import com.gymunity.admin.repository.AdminMapper;
import com.gymunity.admin.service.adminService;
import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.challenge.dto.Verify;
import com.gymunity.challenge.repository.ChallengeMapper;
import com.gymunity.point.dto.PointAdjust;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.user.dto.PointDetailDTO;
import com.gymunity.user.dto.User;
import com.gymunity.user.repository.UserMapper;
import com.gymunity.user.response.PointDetailResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class adminServiceImpl implements adminService {

	private final AdminMapper adminMapper;
	private final ChallengeMapper challengeMapper;
	private final PointMapper pointMapper;
	private final UserMapper userMapper;

	@Override
	public List<PhotoDTO> getPhotosByResultNProcess() {
		return adminMapper.selectPhotosByResultN();
	}

	@Override
	public void verifyCheckProcess(int viId, String result) {
		// viId에 해당하는 verify 가져오기
		Verify existingDto = adminMapper.selectVerifyByviId(viId);

		int userId = existingDto.getUserId();
		int chId = existingDto.getChId();

		// result 업데이트
		adminMapper.updateResult(viId, result);

		// result Y 카운트하기
		int yCount = adminMapper.countSuccessfulVerifications(userId, chId);

		// chId에 해당하는 challenges 가져오기
		Challenge challenge = challengeMapper.selectChallengesByChId(chId);
		int totalDate = challenge.getTotalDate();

		// 성공률 구하기
		double achieveRate = (double) yCount / totalDate * 100;

		// 성공률 업데이트
		adminMapper.updateAchieveRate(userId, chId, achieveRate);

	}// end verifyCheckProcess()

	@Override
	public Map<String, Integer> countByWeek(List<LocalDate> dates) {
		Map<String, Integer> weeklyCounts = new TreeMap<>();
		for (LocalDate date : dates) {
			int week = date.get(WeekFields.of(Locale.getDefault()).weekOfMonth());
			int month = date.getMonthValue();
			String key = month + "월" + week + "주";
			weeklyCounts.merge(key, 1, Integer::sum);
		}
		return weeklyCounts;
	}// end countByWeek()

	@Override
	public Map<String, Integer> countSubmissionsByWeek() {
		List<LocalDate> submissionDates = adminMapper.selectAllSubmissions();

		return countByWeek(submissionDates);
	}// end countSubmissionsByWeek()

	@Override
	public Map<String, Integer> countAllSignUpByWeek() {
		List<LocalDate> signupDates = adminMapper.selectAllSignupDates();

		return countByWeek(signupDates);
	}// end countSignUpByWeek()

	@Override
	public Map<String, Integer> countAllSignInByWeek() {
		List<LocalDate> signinDates = adminMapper.selectAllSigninDates();

		return countByWeek(signinDates);
	}// end countAllSignInByWeek()

	@Override
	public Map<String, Integer> countReferrerSignUpByWeek() {
		List<LocalDate> ReferrerSignupDates = adminMapper.selectReferrerSignupDates();

		return countByWeek(ReferrerSignupDates);
	}// end countReferrerSignupByWeek()

	@Override
	public Map<String, Map<String, Integer>> getAllDataByWeek() {
		Map<String, Map<String, Integer>> allData = new TreeMap<>();
		allData.put("submissions", countSubmissionsByWeek());
		allData.put("signUp", countAllSignUpByWeek());
		allData.put("signIn", countAllSignInByWeek());
		allData.put("referrerSignUp", countReferrerSignUpByWeek());

		return allData;
	}// getAllDataByWeek()

	@Override
	public PointDetailResponse getPointsProcess(String userAccountId) {

		PointDetailResponse response = new PointDetailResponse();

		List<PointDetailDTO> dto = adminMapper.getPointsByUserAccountId(userAccountId);
		response.setDetails(dto);

		return response;
	}// end getPointsProcess()

	@Override
	public void insertOrUpdateadjustPointsProcess(AddPointAdjustmentDTO dto) {
		
		User user = userMapper.selectUsersByAccountId(dto.getUserAccountId());

		int userId = user.getUserId();
		
		PointAdjust pointAdjust = new PointAdjust();
		pointAdjust.setUserId(userId);
		pointAdjust.setPointsAdjusted(dto.getPointsAdjusted());
		pointAdjust.setReason(dto.getReason());
		pointMapper.adjustPoint(pointAdjust);

		pointMapper.adjustPointsAggr(userId);
	}// end insertOrUpdateadjustPointsProcess()


//	@Override
//	public int getUserIdByNickName(String nickName) { // 추가
//	    return adminMapper.getUserIdByNickName(nickName);
//	}

	@Override
	public UserDetails getUserDetails(int userId) {
		return adminMapper.getUserDetails(userId);
	}


    @Override
    public void updateNickName(int userId, String nickName) {
        adminMapper.updateNickName(userId, nickName);
    }

    @Override
    public void updateIsActive(int userId) {
        adminMapper.updateIsActive(userId);
    }
    
	@Override
	public boolean isUserNameExists(String nickName) {
		UserDetails user = adminMapper.Namecheck(nickName);
		boolean exists = user != null; 
		return exists;
	}

}// end class
