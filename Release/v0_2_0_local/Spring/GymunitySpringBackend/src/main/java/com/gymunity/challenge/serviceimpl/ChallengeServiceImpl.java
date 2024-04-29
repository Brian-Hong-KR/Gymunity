package com.gymunity.challenge.serviceimpl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Stream;

import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.dto.Member;
import com.gymunity.challenge.dto.PageDTO;
import com.gymunity.challenge.dto.ProfileDTO;
import com.gymunity.challenge.repository.ChallengeMapper;
import com.gymunity.challenge.response.ChallengeCreateResponse;
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
					.filter(date -> date.getDayOfWeek() == DayOfWeek.SATURDAY
							|| date.getDayOfWeek() == DayOfWeek.SUNDAY)
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

		// String 날짜를 LocalDate로 변환
		LocalDate startDate = LocalDate.parse(dto.getChStartDate());
		LocalDate endDate = LocalDate.parse(dto.getChEndDate());

		int totalVerificationDays = calculateTotalVerificationDays(startDate, endDate, dto.getVerifyTerm());

		// 이미 챌린지가 등록된 경우 예외 처리
		if (existingChallenge != null && !"done".equals(existingChallenge.getProceed())) {
			throw new ChallengeDuplicateEntryException("이미 챌린지를 생성하였습니다.");
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
		challenge.setChallengePeriod(dto.getChallengePeriod());
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

//    // 이미 참여중인지 확인
//    int count = challengeMapper.countMembersByUserIdAndChId(chId, userId);
//
//    if (count != 0) {
//        throw new ChallengeException("이미 참가한 챌린지입니다.");
//    }
	// 챌린지 참가
	@Override
	public void joinChallengeProcess(int chId, int userId) {
		try {
			// Profile 테이블에 ch_id1, ch_id2 중 0값이 있으면 chId를 업데이트
			challengeMapper.updateProfile(chId, userId);
			int rowsUpdated = challengeMapper.getUpdateCount(); // 업데이트된 행의 수
			if (rowsUpdated == 0) {
				// 만약 업데이트된 행이 없는 경우, 즉 두 컬럼 모두 값이 0이 아닌 경우
				throw new RuntimeException("프로필 업데이트 중 오류가 발생했습니다. 이미 다른 챌린지에 참여 중입니다.");
			}

			// member 등록
			Member member = new Member();
			member.setMemChId(chId);
			member.setMemUserId(userId);
			member.setRegistrant("N");
			challengeMapper.insertMembers(member);

			// challenges count 추가
			challengeMapper.updateChallengeCount(chId);
		} catch (Exception ex) {
			// 다른 예외 처리
			// 예외 메시지 로깅 또는 다른 처리
			throw new RuntimeException("챌린지 참여 중 오류가 발생했습니다.", ex);
		}
	}

	// 챌린지 상세보기
	@Override
	public Challenge detailChallengeProcess(int chId) {
		return challengeMapper.selectChallengesByChId(chId);
	}// end detailChallengeProcess()

//	// 챌린지 수정
//	@Override
//	public void updateChallengeProcess(Challenge dto, int userId) {
//
//		// userId를 사용해서 Challenge 정보 조회
//		Challenge challenge = challengeMapper.selectChallengesByUserId(userId);
//
//		// dto에 userId set
//		dto.setUserId(userId);
//
//		// 회원 카운트가 1이면
//		if (challenge.getCount() == 1) {
//			// 챌린지 수정
//			challengeMapper.updateChallenges(dto);
//		} else {
//			throw new ChallengeException("사용자에 대한 챌린지 정보가 하나만 존재하지 않습니다.");
//		}
//	}// end updateChallengeProcess()

	// 챌린지 삭제
	@Override
	public void deleteChallengeProcess(int chId, int userId) {
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

			challengeMapper.deleteChallenges(chId);
		} else {
			throw new ChallengeException("사용자에 대한 챌린지 정보가 하나만 존재하지 않습니다.");
		}

	}// end deleteChallengeProcess()

	// 챌린지 개수 세기
	@Override
	public int countProcess() {
		return challengeMapper.count();
	}

	// 챌린지 리스트 조회
	@Override
	public List<Challenge> listProcess(PageDTO pv) {
		return challengeMapper.list(pv);
	}

	// 참가중인 챌린지id 리스트 조회
	@Override
	public List<ProfileDTO> joinListProcess(int userId) {
		return challengeMapper.joinList(userId);
	}


}// end class
