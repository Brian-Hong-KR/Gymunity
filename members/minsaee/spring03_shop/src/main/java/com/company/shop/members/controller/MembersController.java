package com.company.shop.members.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.company.shop.members.dto.AuthInfo;
import com.company.shop.members.dto.MembersDTO;
import com.company.shop.members.service.MembersService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
@Slf4j
@RestController
public class MembersController {

	@Autowired
	private MembersService membersService;

	@Autowired
	private BCryptPasswordEncoder encodePassword;

	public MembersController() {

	}

	// 회원가입 처리
	@PostMapping("/member/signup")
	public ResponseEntity<AuthInfo> addmember(@RequestBody MembersDTO membersDTO) {
		log.info("membersDTO:{}:", membersDTO);

		// membersDTO의 MemberPass를 암호화
		membersDTO.setMemberPass(encodePassword.encode(membersDTO.getMemberPass()));

		AuthInfo authInfo = membersService.addMemberProcess(membersDTO);
		return ResponseEntity.ok(authInfo);
	}

	// 회원정보 가져오기
	@GetMapping("/member/editinfo/{memberEmail}")
	public ResponseEntity<MembersDTO> getmember(@PathVariable("memberEmail") String memberEmail) {
		return ResponseEntity.ok(membersService.updateMemberProcess(memberEmail));
	}

	// 회원 정보 수정
	@PutMapping("/member/update")
	public ResponseEntity<AuthInfo> updateMember(@RequestBody MembersDTO membersDTO) {
		membersDTO.setMemberPass(encodePassword.encode(membersDTO.getMemberPass()));

		return ResponseEntity.ok(membersService.updateMemberProcess(membersDTO));
	}

	// 회원탈퇴
	@DeleteMapping("/member/delete/{memberEmail}")
	public ResponseEntity<Object> deleteMember(@PathVariable("memberEmail") String memberEmail) {
		membersService.deleteMemberPreocess(memberEmail);
		return ResponseEntity.ok(null);
	}
}
