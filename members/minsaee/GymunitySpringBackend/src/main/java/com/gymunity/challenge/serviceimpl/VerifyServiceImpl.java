package com.gymunity.challenge.serviceimpl;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenge.dto.Verify;
import com.gymunity.challenge.repository.VerifyMapper;
import com.gymunity.challenge.service.VerifyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VerifyServiceImpl implements VerifyService {

	private final VerifyMapper verifyMapper;

	@Value("${spring.servlet.multipart.location}")
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
		String newFilename = uniqueIdentifier + "_" + originalFilename;
		File newFile = new File(userDirectory, newFilename);
		file.transferTo(newFile);
		return newFilename;

	}// end verifyUploadProcess()

	@Override
	public void verifyUploadProcess(int userId, int chId, MultipartFile file) {

		LocalDateTime now = LocalDateTime.now();

		LocalDateTime today4am = now.toLocalDate().atStartOfDay().plusHours(4);

		Verify existingDto = verifyMapper.selectVerifyByUserIdAndChId(userId, chId);

		try {
			if (existingDto == null) {
				String newFilename = verifysaveFileProcess(userId, chId, file);
				Verify newDto = new Verify();
				newDto.setUserId(userId);
				newDto.setChId(chId);
				newDto.setUpload1(newFilename);
				verifyMapper.insertVerify(newDto);
			} else {
				// 마지막 인증사진 업데이트 시간 가져오기
				LocalDateTime lastUpdateDate = existingDto.getUpdateVerify();
				// 업데이트 시간이 오늘 새벽 4시 전일 때
				if (lastUpdateDate.isBefore(today4am)) {
					if (existingDto.getUpload1() != null && existingDto.getUpload2() == null) {
						String newFilename = verifysaveFileProcess(userId, chId, file);
						existingDto.setUpload2(newFilename);
						verifyMapper.updateVerify(existingDto);
					} else {
						throw new IllegalStateException("오늘은 인증을 모두 하셨습니다");
					}
					// 업데이트 시간이 오늘 새벽 4시 전이 아닐 때
				} else {
					String newFilename = verifysaveFileProcess(userId, chId, file);
					Verify newDto = new Verify();
					newDto.setUserId(userId);
					newDto.setChId(chId);
					newDto.setUpload1(newFilename);
					verifyMapper.insertVerify(newDto);
				}
			}
		} catch (IOException e) {
			// Log the exception or handle it according to your application's requirements
			throw new RuntimeException("Failed to process file upload due to an IO error", e);
		}

	}// end verifyUploadProcess()
}
// end class
