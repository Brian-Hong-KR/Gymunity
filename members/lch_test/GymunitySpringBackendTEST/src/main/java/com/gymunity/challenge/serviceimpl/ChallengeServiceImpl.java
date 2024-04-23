package com.gymunity.challenge.serviceimpl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.dto.Member;
import com.gymunity.challenge.repository.ChallengeMapper;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.response.ChallengeDetailResponse;
import com.gymunity.challenge.response.ChallengeJoinResponse;
import com.gymunity.challenge.service.ChallengeService;
import com.gymunity.common.exception.ChallengeDuplicateEntryException;
import com.gymunity.common.exception.ChallengeException;
import com.gymunity.point.dto.PointAdd;
import com.gymunity.point.dto.PointSubtract;
import com.gymunity.point.repository.PointMapper;
import com.gymunity.point.service.PointService;
import com.gymunity.user.dto.User;
import com.gymunity.user.repository.UserMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeServiceImpl implements ChallengeService {

	private final ChallengeMapper challengeMapper;
	private final UserMapper userMapper;
	private final PointMapper pointMapper;
	private final PointService pointService;

	// 총 인증 가능 일수를 계산하는 메서드
	private int calculateTotalVerificationDays(LocalDate startDate, LocalDate endDate, int verifyTerm) {
		switch (verifyTerm) {
		case 1:
			// 매일
			return (int) ChronoUnit.DAYS.between(startDate, endDate) + 1;
		case 2:
			// 평일
			return (int) Stream.iterate(startDate, date -> date.plusDays(1))
					.limit(ChronoUnit.DAYS.between(startDate, endDate.plusDays(1)))
					.filter(date -> date.getDayOfWeek().getValue() >= DayOfWeek.MONDAY.getValue()
							&& date.getDayOfWeek().getValue() <= DayOfWeek.FRIDAY.getValue())
					.count();
		case 3:
			// 주말
			return (int) Stream.iterate(startDate, date -> date.plusDays(1))
			        .limit(ChronoUnit.DAYS.between(startDate, endDate.plusDays(1)))
			        .filter(date -> date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY)
			        .count();
		case 4:
			// 주 1일
			long weeks1 = ChronoUnit.WEEKS.between(startDate, endDate) + 1;
			return (int) weeks1 * 1;
		case 5:
			// 주 2일
			long weeks2 = ChronoUnit.WEEKS.between(startDate, endDate) + 1;
			return (int) weeks2 * 2;
		case 6:
			// 주 3일
			long weeks3 = ChronoUnit.WEEKS.between(startDate, endDate) + 1;
			return (int) weeks3 * 3;
		default:
			throw new IllegalArgumentException("Invalid verification term");
		}

	}// end calculateTotalVerificationDays()

	// 챌린지 생성
	@Override
	public ChallengeCreateResponse createChallengeProcess(ChallengeCreateDTO dto, int userId) {

		// userId로 기존 챌린지 정보 조회
		Challenge existingChallenge = challengeMapper.selectChallengesByUserId(userId);

		int totalVerificationDays = calculateTotalVerificationDays(dto.getChStartDate(), dto.getChEndDate(),
				dto.getVerifyTerm());

		// 이미 챌린지가 등록된 경우 예외 처리
		if (existingChallenge != null) {
			throw new ChallengeDuplicateEntryException("이 사용자는 이미 챌린지에 등록되어 있습니다.");
		}

		// challenge 등록
		Challenge challenge = new Challenge();
		challenge.setTitle(dto.getTitle());
		challenge.setContent(dto.getContent());
		challenge.setCategory(dto.getCategory());
		challenge.setBettingPoint(dto.getBettingPoint());
		challenge.setChStartDate(dto.getChStartDate());
		challenge.setChEndDate(dto.getChEndDate());
		challenge.setVerifyTerm(dto.getVerifyTerm());
		challenge.setTotalDate(totalVerificationDays);
		challenge.setUserId(userId);
		challengeMapper.insertChallenges(challenge);

		// member 등록
		Member member = new Member();
		member.setMemUserId(challenge.getUserId());
		member.setMemChId(challenge.getChId());
		member.setRegistrant("Y");
		challengeMapper.insertMembers(member);

		// point 차감 등록
		PointSubtract pointSubtract = new PointSubtract();
		pointSubtract.setUserId(member.getMemUserId());
		pointSubtract.setPointsSubtracted(challenge.getBettingPoint());
		pointSubtract.setSubtractedReason("챌린지 참가");
		pointMapper.subtractPoint(pointSubtract);

		// 회원 포인트 업데이트
		pointService.subtractOrUpdatePointsAggr(member.getMemUserId());

		// userId로 users Table 조회하기
		User user = userMapper.selectUsersByUserId(userId);

		// 응답 객체 생성 및 필드 설정
		ChallengeCreateResponse response = new ChallengeCreateResponse();
		response.setTitle(challenge.getTitle());
		response.setCategory(challenge.getCategory());
		response.setProceed(challenge.getProceed());
		response.setNickName(user.getNickName());
		response.setGradeName(user.getGradeName());

		return response;
	}// end createChallengeProcess()

	// 챌린지 참가
	@Override
	public ChallengeJoinResponse joinChallengeProcess(int chId, int userId) {

		// 이미 참여중인지 확인
		int count = challengeMapper.countMembersByUserIdAndChId(chId, userId);

		if (count != 0) {
			throw new ChallengeException("이미 참가한 챌린지입니다.");
		}

		// member 등록
		Member member = new Member();
		member.setMemChId(chId);
		member.setMemUserId(userId);
		member.setRegistrant("N");
		challengeMapper.insertMembers(member);

		// challenges count 추가
		challengeMapper.updateChallengeCount(chId);

		return null;
	}// end joinChallengeProcess()

	// 챌린지 상세
	@Override
	public ChallengeDetailResponse detailChallengeProcess(int chId) {

		// chId를 사용해서 Challenge 정보 조회
		Challenge challenge = challengeMapper.selectChallengesByChId(chId);

		ChallengeDetailResponse challengeDetailResponse = new ChallengeDetailResponse();
		challengeDetailResponse.setTitle(challenge.getTitle());
		challengeDetailResponse.setContent(challenge.getContent());
		challengeDetailResponse.setCategory(challenge.getCategory());
		challengeDetailResponse.setBettingPoint(challenge.getBettingPoint());
		challengeDetailResponse.setProceed(challenge.getProceed());
		challengeDetailResponse.setChStartDate(challenge.getChStartDate());
		challengeDetailResponse.setChEndDate(challenge.getChEndDate());
		challengeDetailResponse.setCount(challenge.getCount());

		return challengeDetailResponse;
	}// end detailChallengeProcess()

	// 챌린지 수정
	@Override
	public void updateChallengeProcess(Challenge dto, int userId) {

		// userId를 사용해서 Challenge 정보 조회
		Challenge challenge = challengeMapper.selectChallengesByUserId(userId);

		// dto에 userId set
		dto.setUserId(userId);

		// 회원 카운트가 1이면
		if (challenge.getCount() == 1) {
			// 챌린지 수정
			challengeMapper.updateChallenges(dto);
		} else {
			throw new ChallengeException("사용자에 대한 챌린지 정보가 하나만 존재하지 않습니다.");
		}

	}// end updateChallengeProcess()

	// 챌린지 삭제
	@Override
	public void deleteChallengeProcess(int userId) {
		// 토큰에서 userId 가져오기
		// userId로 challenge 조회하기
		// count가 1이면
		// bettingpoint만큼 포인트 등록
		// challenge 삭제

		Challenge challenge = challengeMapper.selectChallengesByUserId(userId);

		// 챌린지가 없는 경우 예외 처리
		if (challenge == null) {
			throw new ChallengeException("챌린지를 생성하지 않았습니다.");
		}

		if (challenge.getCount() == 1) {
			PointAdd pointAdd = new PointAdd();
			pointAdd.setUserId(userId);
			pointAdd.setPointsAdded(challenge.getBettingPoint());
			pointAdd.setAddedReason("챌린지 취소");
			pointMapper.addPoint(pointAdd);

			pointService.addOrUpdatePointsAggr(userId);

			challengeMapper.deleteChallenges(userId);
		} else {
			throw new ChallengeException("사용자에 대한 챌린지 정보가 하나만 존재하지 않습니다.");
		}

	}// end deleteChallengeProcess()

}// end class
