package com.company.shop.members.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.company.shop.members.dto.SignResponse;
import com.company.shop.members.dto.MembersDTO;
import com.company.shop.members.entity.MembersEntity;
import com.company.shop.members.repository.MembersRepository;
import com.company.shop.security.jwt.JwtProvider;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Slf4j
@Service
@RequiredArgsConstructor
public class MembersServiceImp implements MembersService {

	private final MembersRepository membersRepository;

	@Override
	public SignResponse getByMemberEmail(String memberEmail) {
		log.info("loadUserByUsername:{}", memberEmail);
		MembersEntity membersEntity = membersRepository.selectByEmail(memberEmail);

		if (membersEntity == null)
			new UsernameNotFoundException("Invalid authentication!");

		// return new SignResponse(membersEntity.getMemberEmail(),
		// membersEntity.getMemberName(), membersEntity.getMemberPass());
		return SignResponse.builder().memberEmail(membersEntity.getMemberEmail())
				.memberName(membersEntity.getMemberName()).accessToken(JwtProvider.createAccessToken(memberEmail))
				.refreshToken(JwtProvider.createRefreshToken(memberEmail)).build();
	}

	@Override
	public SignResponse addMemberProcess(MembersDTO dto) {
		MembersEntity entity = MembersDTO.toEntity(dto);
		log.info("entity {} {} ", entity.getMemberEmail(), entity.getMemberName());
		membersRepository.insertMember(entity);
		// membersRepository.save(entity);
		return new SignResponse(dto.getMemberEmail(), dto.getMemberName(), dto.getMemberPass());
	}

	@Override
	public MembersDTO updateMemberProcess(String memberEmail) {
		return MembersDTO.toDto(membersRepository.selectByEmail(memberEmail));
	}

	@Override
	public SignResponse updateMemberProcess(MembersDTO dto) {

		membersRepository.updateMember(MembersDTO.toEntity(dto));
		return new SignResponse(dto.getMemberEmail(), dto.getMemberName(), dto.getMemberPass());
	}

//
//	@Override
//	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd) {
//		// TODO Auto-generated method stub
//
//	}
//	
	@Override
	public void deleteMemberProcess(String memberEmail) {
		membersRepository.deleteMember(memberEmail);
	}
}
