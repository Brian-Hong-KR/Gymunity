package com.gymunity.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.admin.dto.AdminEditUserDTO;
import com.gymunity.admin.dto.UserDetails;
import com.gymunity.admin.dto.AddPointAdjustmentDTO;
import com.gymunity.admin.dto.VerifyCheckDTO;
import com.gymunity.admin.service.adminService;
import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.user.response.PointDetailResponse;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class adminController {

	private final adminService adminService;

	// 인증사진 리스트
	@GetMapping("/admin/verify/list")
	public ResponseEntity<List<PhotoDTO>> getPhotosByResultN() {
		List<PhotoDTO> response = adminService.getPhotosByResultNProcess();
		return ResponseEntity.ok(response);
	}// end getPhotosByResultN()

	// 인증사진 확인
	@Operation(summary = "사진확인")
	@PutMapping("/admin/verify/check")
	public ResponseEntity<Object> verifyCheck(@RequestBody VerifyCheckDTO dto) {

		adminService.verifyCheckProcess(dto.getViId(), dto.getResult());
		return ResponseEntity.ok("인증확인 업데이트 되었습니다.");
	}// end verifyCheck()

	@GetMapping("/admin/info")
	public Map<String, Map<String, Integer>> getAllDataByWeek() {
		return adminService.getAllDataByWeek();
	}// end getAllDataByWeek()

	// 포인트상세페이지
	@Operation(summary = "어드민 포인트 상세페이지")
	@GetMapping("/admin/points/history/{userAccountId}")
	public ResponseEntity<PointDetailResponse> getPointDetail(@PathVariable("userAccountId") String userAccountId) {

		PointDetailResponse response = adminService.getPointsProcess(userAccountId);
		return ResponseEntity.ok(response);
	}// end getMyPage()
	
	// 포인트 추가하기
	@PostMapping("/admin/points/adjust")
	public void adjustPoint(@RequestBody AddPointAdjustmentDTO dto) {
		adminService.insertOrUpdateadjustPointsProcess(dto);
	}

	@GetMapping("/getUserDetails/{nickName}")
	public UserDetails getUserDetails(@PathVariable("nickName") String nickName) {
	    int userId = adminService.getUserIdByNickName(nickName);
	    return adminService.getUserDetails(userId);
	}

    @PutMapping("/updateNickName")
    public void updateNickName(@RequestParam("userId") int userId, @RequestParam("nickName") String nickName) {
        adminService.updateNickName(userId, nickName);
    }

    @PutMapping("/updateIsActive")
    public void toggleIsActive(@RequestParam("userId") int userId) {
        adminService.updateIsActive(userId);
    }
	 
	// 닉네임 중복 체크
	@Operation(summary = "닉네임 중복 체크")
	@GetMapping("/checkUserNickname/{nickName}")
	 public ResponseEntity<String> checkUsername(@PathVariable("nickName")String nickName) {
		try {
	        // 아이디 중복 확인을 위해 UserService의 메서드 호출
	        boolean isExists = adminService.isUserNameExists(nickName);
	        
	        if (isExists) {
	            // 아이디가 이미 존재하는 경우
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 닉네임입니다.");
	        } else {
	            // 아이디가 존재하지 않는 경우
	            return ResponseEntity.ok("사용할 수 있는 닉네임입니다.");
	        }
	    } catch (Exception e) {
	        // 예외 발생 시
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
	    }
	}
}// end class
