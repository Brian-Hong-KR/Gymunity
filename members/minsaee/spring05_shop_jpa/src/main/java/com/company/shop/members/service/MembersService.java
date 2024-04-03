package com.company.shop.members.service;

import com.company.shop.members.dto.SignResponse;
import com.company.shop.members.dto.MembersDTO;

public interface MembersService {
	public SignResponse getByMemberEmail(String memberEmail);

	public SignResponse addMemberProcess(MembersDTO dto);

	public MembersDTO updateMemberProcess(String memberEmail);

	public SignResponse updateMemberProcess(MembersDTO dto);
//	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd);

	public void deleteMemberProcess(String memberEmail);
}
