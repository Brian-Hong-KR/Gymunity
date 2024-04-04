package com.test.security.config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.test.users.dto.UsersDTO;

public class CustomUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private UsersDTO usersDTO;

	public CustomUserDetails() {

	}

	public CustomUserDetails(UsersDTO usersDTO) {
		this.usersDTO = usersDTO;
	}

	public UsersDTO getUsersDTO() {
		return usersDTO;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {

			@Override
			public String getAuthority() {
				return null;
			}
		});

		return collect;

	}// end getAuthorities()

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	// 계정만료여부 리턴 - true(만료안됨)
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	// 계정잠김여부 리턴 - true(잠김X)
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	// 비밀번호잠김여부 리턴 - true(잠김X)
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	// 계정활성화여부 리턴 - true(활성화)
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
