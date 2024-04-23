package com.company.shop.members.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.shop.members.dto.MembersDTO;
import com.company.shop.members.dto.SignResponse;
import com.company.shop.members.service.MembersService;
import com.company.shop.redis.TokenService;
import com.company.shop.security.jwt.JwtProperties;
import com.company.shop.security.jwt.JwtProvider;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "회원 관련", description = "사용자 관련 API")
@Slf4j
//@CrossOrigin(origins ={"http://localhost:3000"})
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class MembersController {

	private final MembersService membersService;
	private final TokenService tokenService;

	private final BCryptPasswordEncoder encodePassword;

	@Operation(summary = "회원가입하기", description = "회원가입  API")
	// 회원가입 처리
	@PostMapping("/member/signup")
	public ResponseEntity<SignResponse> addmember(@RequestBody MembersDTO membersDTO) {
		log.info("membersDTO:{}:", membersDTO);
		membersDTO.setMemberPass(encodePassword.encode(membersDTO.getMemberPass()));
		SignResponse authInfo = membersService.addMemberProcess(membersDTO);
		return ResponseEntity.ok(authInfo);
	}

	@Operation(summary = "로그인하기", description = "로그인  API")
	@PostMapping(value = "/member/login")
	public ResponseEntity<SignResponse> signin(@RequestBody MembersDTO membersDTO) throws Exception {
		String accessToken = JwtProperties.TOKEN_PREFIX + JwtProvider.createAccessToken(membersDTO.getMemberEmail());
		String refreshToken = JwtProvider.createRefreshToken(membersDTO.getMemberEmail());

		System.out.println("accessToken:" + accessToken);
		System.out.println("refreshToken" + refreshToken);

		// MySQL DB 조회
		MembersDTO mdto = membersService.updateMemberProcess(membersDTO.getMemberEmail());
		// redis DB 저장
		tokenService.saveTokens(mdto.getMemberEmail(), accessToken, accessToken);

		SignResponse signResponse = SignResponse.builder().memberEmail(mdto.getMemberEmail())
				.memberName(mdto.getMemberName()).memberPass(mdto.getMemberPass()).accessToken(accessToken)
				.refreshToken(refreshToken).build();
		return ResponseEntity.ok(signResponse);
	}

	// 회원정보 가져오기
	@Operation(summary = "회원정보 가져오기", description = "회원정보 가져오기 API")
	@GetMapping("/member/editinfo/{memberEmail}")
	public ResponseEntity<MembersDTO> getMember(@PathVariable("memberEmail") String memberEmail) {
		return ResponseEntity.ok(membersService.updateMemberProcess(memberEmail));
	}

	// 회원정보 수정
	@Operation(summary = "회원정보 수정", description = "회원정보 수정 API")
	@PutMapping("/member/update")
	public ResponseEntity<SignResponse> updateMember(@RequestBody MembersDTO membersDTO) {
		membersDTO.setMemberPass(encodePassword.encode(membersDTO.getMemberPass()));
		return ResponseEntity.ok(membersService.updateMemberProcess(membersDTO));
	}

	// 회원탈퇴
	@Operation(summary = "회원탈퇴", description = "회원탈퇴 API")
	@DeleteMapping("/member/delete/{memberEmail}")
	public ResponseEntity<Object> deleteMember(@PathVariable("memberEmail") String memberEmail) {
		membersService.deleteMemberProcess(memberEmail);
		return ResponseEntity.ok(null);
	}

}// end class
