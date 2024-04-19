package com.gymunity.challenge.serviceimpl;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.challenge.dto.Verify;
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

		LocalDateTime now = LocalDateTime.now();

		LocalDateTime today4am = now.toLocalDate().atStartOfDay().plusHours(4);

		Verify existingDto = verifyMapper.selectVerifyByUserIdAndChId(userId, chId);

		String baseDirectory = "verify/" + userId;

		

		try {
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
				// 업데이트 시간이 오늘 새벽 4시 전일 때
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
					// 업데이트 시간이 오늘 새벽 4시 전이 아닐 때
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
	
	// 사진첩
	@Override
	public List<PhotoDTO> getPhotosByUserId(int userId) {
		return verifyMapper.selectPhotosByUserId(userId);
	}// end getPhotosByUserId()
}
// end class
