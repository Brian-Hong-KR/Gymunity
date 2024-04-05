package com.test.security.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.users.dto.UsersDTO;
import com.test.users.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor

public class CustomUserDetailService implements UserDetailsService {

	private final UsersRepository usersRepository;

	// 1. AuthenticationProvider에서 loadUserByUsername(String usersAccountId)을 호출한다.
	// 2. loadUserByUsername(String usersAccountId)에서는 DB에서 userAccountId에 해당하는 데이터를
	// 검색해서 UserDatils에 담아서 리턴한다.
	// 3. AuthenticationProvider에서 UserDetailes를 받아서 Authentication에 저장을 함으로써 결국
	// Security Session에 저장을 한다.

	@Override
	public UserDetails loadUserByUsername(String userAccountId) throws UsernameNotFoundException {
		log.info("로드유저바이유저네임 : {}", userAccountId);

		UsersDTO usersDTO = usersRepository.selectByAccountId(userAccountId);

		if (usersDTO == null) {
			throw new UsernameNotFoundException("히히 몰라! 커스텀유저디테일서비스");
		}

		log.info("userAccountId : {}", usersDTO.getUserAccountId());

		return new CustomUserDetails(usersDTO);

	} // end loadUsersByUsername()

}// end class
