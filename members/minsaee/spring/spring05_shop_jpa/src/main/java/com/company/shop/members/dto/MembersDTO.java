package com.company.shop.members.dto;

import org.springframework.stereotype.Component;

import com.company.shop.common.exception.WrongEmailPasswordException;
import com.company.shop.members.entity.MembersEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembersDTO {
	private String memberEmail; // 이메일
	private String memberPass; // 비밀번호
	private String memberName; // 이름
	private String memberPhone; // 전화번호
	// private long memberType=1; // 회원구분 일반회원 1, 관리자 2
	// private String authRole;

	public boolean matchPassword(String memberPass) {
		return this.memberPass.equals(memberPass);
	}

	public void changePassword(String oldPassword, String newPassword) {
		if (!this.memberPass.equals(oldPassword))
			throw new WrongEmailPasswordException("비밀번호 불일치");
		this.memberPass = newPassword;
	}

	// dto =>entity
	public static MembersEntity toEntity(MembersDTO dto) {
		MembersEntity entity = MembersEntity.builder().memberEmail(dto.getMemberEmail()).memberPass(dto.getMemberPass())
				.memberName(dto.getMemberName()).memberPhone(dto.getMemberPhone()).build();
		return entity;
	}

	// entity => dto
	public static MembersDTO toDto(MembersEntity entity) {
		MembersDTO dto = MembersDTO.builder().memberEmail(entity.getMemberEmail()).memberPass(entity.getMemberPass())
				.memberName(entity.getMemberName()).memberPhone(entity.getMemberPhone()).build();
		return dto;
	}
}
