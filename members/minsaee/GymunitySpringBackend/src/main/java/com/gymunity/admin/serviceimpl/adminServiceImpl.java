package com.gymunity.admin.serviceimpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.admin.repository.AdminMapper;
import com.gymunity.admin.service.adminService;
import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.Verify;
import com.gymunity.challenge.repository.ChallengeMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
public class adminServiceImpl implements adminService {

	private final AdminMapper adminMapper;
	private final ChallengeMapper challengeMapper;

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

}// end class
