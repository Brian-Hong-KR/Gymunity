package com.gymunity.challenge.serviceimpl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeServiceImpl implements ChallengeService {
	
	@Autowired
	private PageDTO pdto;
	private int currentPage;
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
	
	// 챌린지 리스트 조회
		@Override
		public Map<String, Object> listProcess(int currentPage, String categoryString, int userId) {
		    // categoryString이 null이거나 "undefined"인 경우 0으로 설정
			
		    int category = 0;
		    if (categoryString != null && !"undefined".equals(categoryString)) {
		        try {
		            category = Integer.parseInt(categoryString);
		        } catch (NumberFormatException e) {
		            // 예외 발생 시 기본값인 0으로 유지
		            log.warn("Failed to parse category value: {}", categoryString);
		        }
		    }
		    
			Map<String, Object> map = new HashMap<>();
			int totalRecord = challengeMapper.count();
			log.info("totalRecord:{}", totalRecord);
			
			if (totalRecord >= 1) {
				this.currentPage = currentPage;
				this.pdto = new PageDTO(this.currentPage, totalRecord);
				map.put("pv", this.pdto);
				map.put("challengeList", challengeMapper.list(category, pdto.getStartRow(), pdto.getBlockCount()));
//				log.info("pdto.getBlockCount() :{}", pdto.getBlockCount());
			}
			
			if (userId != 0) {
				map.put("joinList", challengeMapper.joinList(userId));
				map.put("joinChIdList", challengeMapper.joinChIdList(userId));
			}
			log.info("challengeList:{}", map.get("challengeList"));
			log.info("joinList:{}", map.get("joinList"));
			log.info("joinChIdList:{}", map.get("joinChIdList"));
			
			return map;
		}

		// 챌린지 상세보기
		@Override
		public Map<String, Object> detailChallengeProcess(int chId, int userId) {
			Map<String, Object> map = new HashMap<>();
			Challenge challenge = challengeMapper.selectChallengesByChId(chId);
			map.put("challengeDetail", challenge);
			List<ProfileDTO> joinChIdList = challengeMapper.joinChIdList(userId);
			map.put("joinChIdList", joinChIdList);
			return map;
		}// end detailChallengeProcess()

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
		// startDate가 오늘 날짜인 경우 proceed를 'pr'로 설정
		if (!startDate.isAfter(LocalDate.now())) {
			challenge.setProceed("pr");
		} else {
			challenge.setProceed("rec");
		}
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

		List<ProfileDTO> pdto = challengeMapper.joinChIdList(userId);
		ProfileDTO profile = pdto.get(0); // 리스트의 첫 번째 요소 선택
		int ch_id1 = profile.getCh_id1();
		int ch_id2 = profile.getCh_id2();

		log.info("ch_id1:{}", ch_id1);

		if (ch_id1 == 0) {
			challengeMapper.updateChId1InProfiles(challenge.getChId(), challenge.getUserId());
		} else if (ch_id1 != 0 && ch_id2 == 0) {
			challengeMapper.updateChId2InProfiles(challenge.getChId(), challenge.getUserId());
		}

		return response;
	}// end createChallengeProcess()

	// 챌린지 참가
	@Override
	public void joinChallengeProcess(int chId, int userId) {
		try {
			// Profile 테이블에 ch_id1, ch_id2 중 0값이 있으면 chId를 업데이트
			List<ProfileDTO> pdto = challengeMapper.joinChIdList(userId);
			ProfileDTO profile = pdto.get(0); // 리스트의 첫 번째 요소 선택
			int ch_id1 = profile.getCh_id1();
			int ch_id2 = profile.getCh_id2();

			log.info("ch_id1:{}", ch_id1);

			if (ch_id1 == 0) {
				challengeMapper.updateChId1InProfiles(chId, userId);
			} else if (ch_id1 != 0 && ch_id2 == 0) {
				challengeMapper.updateChId2InProfiles(chId, userId);
			} else if (ch_id1 != 0 && ch_id2 != 0) {
				throw new RuntimeException("챌린지 참여 중 오류가 발생했습니다.");
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

	// 챌린지 삭제
	@Override
	public void deleteChallengeProcess(int chId, int userId) {
		Challenge challenge = challengeMapper.selectChallengesByUserId(userId);

		if (challenge.getCount() == 1) {
			PointAdd pointAdd = new PointAdd();
			pointAdd.setUserId(userId);
			pointAdd.setPointsAdded(challenge.getBettingPoint());
			pointAdd.setAddedReason("챌린지 취소");
			pointMapper.addPoint(pointAdd);

			pointService.addOrUpdatePointsAggr(userId);
			// profile ch_id 0으로 update
			challengeMapper.updateProfileFinished(chId);
			challengeMapper.deleteChallenges(chId);
		} else {
			throw new ChallengeException("다른 참여자가 있을 경우 삭제가 불가능 합니다.");
		}
	}// end deleteChallengeProcess()

	// 챌린지 proceed 상태 업데이트 및 챌린지 종료
	@Override
	public void updateProceedProcess() {
		LocalDate today = LocalDate.now();
		List<Challenge> challenges = challengeMapper.selectAllChallenges();

		for (Challenge challenge : challenges) {
			int chId = challenge.getChId();
			LocalDate startDate = LocalDate.parse(challenge.getChStartDate());
			LocalDate endDate = LocalDate.parse(challenge.getChEndDate());

			if (startDate.isEqual(today) || startDate.isBefore(today)) {
				challenge.setProceed("pr");
				challengeMapper.updateProceed(chId, challenge.getProceed());
			}
			if (endDate.isEqual(today) || endDate.isBefore(today)) {
				challenge.setProceed("done");
				challengeMapper.updateProceed(chId, challenge.getProceed());
				challengeMapper.updateProfileFinished(chId);
			}
		}
	}

}// end class
