package com.gymunity.challenge.serviceimpl;

import java.io.File;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.challenge.dto.Verify;
import com.gymunity.challenge.repository.ChallengeMapper;
import com.gymunity.challenge.repository.VerifyMapper;
import com.gymunity.challenge.service.VerifyService;
import com.gymunity.common.file.RandomStringGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class VerifyServiceImpl implements VerifyService {

	private final VerifyMapper verifyMapper;
	private final ChallengeMapper challengeMapper;

//	@Value("${spring.servlet.multipart.location}")
	@Value("${react.public.verify}")
	private String filePath;

	@Override
	public String verifysaveFileProcess(int userId, int chId, MultipartFile file) throws IOException {
		if (file == null || file.isEmpty()) {

			throw new IllegalArgumentException("No file uploaded.");
		}

		// 폴더 생성 File.separator(파일 시스템의 디렉터리 구분자)
		File userDirectory = new File(filePath + File.separator + userId + File.separator);
		if (!userDirectory.exists()) {
			userDirectory.mkdirs(); // 폴더가 없다면 생성
		}

		// 파일 저장
		String originalFilename = file.getOriginalFilename();
		String uniqueIdentifier = userId + "_" + chId;
		String extension = "";

		// 파일명에 점이 포함되어 있는 경우 확장자 추출
		int lastIndex = originalFilename.lastIndexOf(".");
		if (lastIndex > 0) {
			extension = originalFilename.substring(lastIndex); // 점 포함하여 확장자 추출
		}
		RandomStringGenerator generator = new RandomStringGenerator();

		// 5~7 사이의 길이를 랜덤하게 설정
		int randomLength = 5 + new Random().nextInt(3); // 5, 6, or 7
		String randomString = generator.generateRandomString(randomLength);

		String newFilename = uniqueIdentifier + "_" + randomString + extension; // 확장자 추가

		File newFile = new File(userDirectory, newFilename);
		file.transferTo(newFile);
		return newFilename;

	}// end verifyUploadProcess()

	@Override
	public void verifyUploadProcess(int userId, int chId, MultipartFile file) {

		// verify 테이블 조회하기
		Verify existingDto = verifyMapper.selectVerifyByUserIdAndChId(userId, chId);
		// challenge 테이블 조회하기
		Challenge challenge = challengeMapper.selectChallengesByChId(chId);
		// verifyTerm 가져오기
		int verifyTerm = challenge.getVerifyTerm();
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime today4am = now.toLocalDate().atStartOfDay().plusHours(4);
		// 현재 시간이 새벽 4시 이전이면, '오늘'의 기준을 전날의 새벽 4시로 설정
		if (now.isBefore(today4am)) {
			today4am = today4am.minusDays(1);
		}

		String baseDirectory = "verify/" + userId;

		DayOfWeek dayOfWeek = now.getDayOfWeek();
		boolean isWeekend = (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY);
		boolean isWeekday = !isWeekend;

		try {
			// 요일 제한 확인
			if ((verifyTerm == 2 && !isWeekday) || (verifyTerm == 3 && !isWeekend)) {
				throw new IllegalStateException("인증 가능한 요일이 아닙니다");
			}

			// 주 인증 횟수 제한 확인
			LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
			LocalDateTime endOfWeek = startOfWeek.plusDays(6); // 일요일 밤까지
			int uploadsThisWeek = verifyMapper.countVerifiesThisWeek(userId, chId, startOfWeek, endOfWeek);
			int allowedUploadsPerWeek = verifyTerm == 4 ? 1
					: verifyTerm == 5 ? 2 : verifyTerm == 6 ? 3 : Integer.MAX_VALUE;

			if (uploadsThisWeek >= allowedUploadsPerWeek && existingDto.getUpload2() != null) {
				throw new IllegalStateException("이번 주 인증 가능 횟수를 모두 사용했습니다");
			}

			if (existingDto == null) {
				String newFilename = verifysaveFileProcess(userId, chId, file);
				String relativePath = baseDirectory + "/" + newFilename;
				Verify newDto = new Verify();
				newDto.setUserId(userId);
				newDto.setChId(chId);
				newDto.setUpload1(relativePath);
				verifyMapper.insertVerify(newDto);
			} else {
				// 마지막 인증사진 업데이트 시간 가져오기
				LocalDateTime lastUpdateDate = existingDto.getUpdateVerify();
				log.info("aaaaaaaa {}", lastUpdateDate);
				// 업데이트 시간이 오늘 새벽 4시 이후 일때
				if (lastUpdateDate.isAfter(today4am)) {

					if (existingDto.getUpload1() != null && existingDto.getUpload2() == null) {
						String newFilename = verifysaveFileProcess(userId, chId, file);
						String relativePath = baseDirectory + "/" + newFilename;
						existingDto.setUpload2(relativePath);
						existingDto.setUpdateVerify(now);
						verifyMapper.updateVerify(existingDto);
					} else {
						throw new IllegalStateException("오늘은 인증을 모두 하셨습니다");
					}
					// 업데이트 시간이 오늘 새벽 4시 후가 아닐 때
				} else {
					String newFilename = verifysaveFileProcess(userId, chId, file);
					String relativePath = baseDirectory + "/" + newFilename;
					Verify newDto = new Verify();
					newDto.setUserId(userId);
					newDto.setChId(chId);
					newDto.setUpload1(relativePath);
					verifyMapper.insertVerify(newDto);
				}
			}
		} catch (IOException e) {
			// Log the exception or handle it according to your application's requirements
			throw new RuntimeException("Failed to process file upload due to an IO error", e);
		}

	}// end verifyUploadProcess()

	// 사진첩조회
	@Override
	public List<PhotoDTO> getPhotosByUserId(int userId) {
		return verifyMapper.selectPhotosByUserId(userId);
	}// end getPhotosByUserId()

	// 사진삭제
	@Override
	public void deletePhotoProcess(String photoPath, int userId) {
		verifyMapper.deletePhoto(photoPath, userId);
		
	}// deletePhotoProcess()
}// end class
