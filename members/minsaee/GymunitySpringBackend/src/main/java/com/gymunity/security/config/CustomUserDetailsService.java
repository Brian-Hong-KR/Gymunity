package com.gymunity.security.config;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gymunity.user.dto.User;
import com.gymunity.user.repository.UserMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor

public class CustomUserDetailsService implements UserDetailsService {

	private final UserMapper userMapper;

	// 1. AuthenticationProvider에서 loadUserByUsername(String usersAccountId)을 호출한다.
	// 2. loadUserByUsername(String usersAccountId)에서는 DB에서 userAccountId에 해당하는 데이터를
	// 검색해서 UserDatils에 담아서 리턴한다.
	// 3. AuthenticationProvider에서 UserDetailes를 받아서 Authentication에 저장을 함으로써 결국
	// Security Session에 저장을 한다.

	@Override
	public UserDetails loadUserByUsername(String userAccountId) throws UsernameNotFoundException {
		User user = userMapper.selectUsersByAccountId(userAccountId);

		if (user == null) {
			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
		}

		return new CustomUserDetails(user);
	}// end loadUsersByUsername()

}// end class