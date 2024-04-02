package com.company.shop.security.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.company.shop.members.dto.MembersDTO;
import com.company.shop.members.entity.MembersEntity;
import com.company.shop.members.repository.MembersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	
	private  final MembersRepository membersRepository;

	// 1. AuthenticationProvider에서 loadUserByUsername(String memberEmail)을 호출한다.
	// 2. loadUserByUsername(String memberEmail)에서는 DB에서 memberEmail에 해당하는 데이터를 검색해서
	// UserDetails에 담아서 리턴해준다.
	// 3. AuthenticationProvider에서 UserDetailes받아서 Authentication에 저장을 함으로써 결국
	// Security Session에 저장을 한다.

	@Override
	public UserDetails loadUserByUsername(String memberEmail) throws UsernameNotFoundException {
		log.info("loadUserByUsername:{}", memberEmail);
		MembersEntity membersEntity = membersRepository.selectByEmail(memberEmail);

		if (membersEntity == null)
			new UsernameNotFoundException("Invalid authentication!");

		MembersDTO membersDTO = MembersDTO.toDto(membersEntity);
		log.info("memberEmail:{} memberPass:{} memberName:{}", membersDTO.getMemberEmail(), membersDTO.getMemberPass(),
				membersDTO.getMemberName());

		return new CustomUserDetails(membersDTO);
	}

}
