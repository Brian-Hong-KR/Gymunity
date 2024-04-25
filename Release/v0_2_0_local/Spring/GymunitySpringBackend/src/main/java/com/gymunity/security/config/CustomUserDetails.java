package com.gymunity.security.config;

//import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.gymunity.user.dto.User;

public class CustomUserDetails implements UserDetails {

	private User user;
	private Integer userId;
	private String adminYn;
	private Collection<? extends GrantedAuthority> authorities; // 권한 목록

	public CustomUserDetails() {
	}


	public CustomUserDetails(User user) {
		this.user = user;
		this.userId = user.getUserId();
		this.adminYn = user.getAdminYn();
		this.authorities = AuthorityUtils.createAuthorityList(user.getAdminYn()); //진
	}

	public User getUser() {
		return user;
	}
	
	public CustomUserDetails(User user, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }


	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

	@Override
	public String getPassword() {
		return null; // Password is not used in token-based authentication
	}

	@Override
	public String getUsername() {
		return null; // Username is not used
	}

	// 계정만료여부 리턴 - true(만료안됨)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	// 계정잠김여부 리턴 - true(잠김X)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	// 비밀번호잠김여부 리턴 - true(잠김X)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	// 계정활성화여부 리턴 - true(활성화)
	@Override
	public boolean isEnabled() {
		return true;
	}

	//진 게터세터
	public Integer getUserId() {
		return userId;
	}


	public void setUserId(Integer userId) {
		this.userId = userId;
	}


	public String getAdminYn() {
		return adminYn;
	}


	public void setAdminYn(String adminYn) {
		this.adminYn = adminYn;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	
}
