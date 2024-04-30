package com.gymunity.security.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.serviceimpl.SigninServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
	private static final int ACCESS_EXPIRED = 701;
	private static final int REFRESH_EXPIRED = 702;
	private static final int DOUBLE_EXPIRED = 703;

	private final SigninServiceImpl signinServiceImpl;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String accessToken = request.getHeader("Authorization");

		String refreshToken = request.getHeader("Authorization-refresh");

		Boolean isAccessToken = null;
		Boolean isRefreshToken = null;

		if (accessToken != null) {
			System.out.println("accessToken:" + accessToken);
			System.out.println("refreshToken:" + refreshToken);
			String authAccToken = accessToken.split(" ")[1];

			isAccessToken = JwtProvider.isExpired(authAccToken);
			isRefreshToken = JwtProvider.isExpired(refreshToken);
		}

		if (Boolean.TRUE.equals(isAccessToken) && Boolean.TRUE.equals(isRefreshToken)) {
			response.sendError(DOUBLE_EXPIRED);
			return;
		} else if (Boolean.FALSE.equals(isAccessToken) && Boolean.TRUE.equals(isRefreshToken)) {
			response.sendError(REFRESH_EXPIRED);
			return;
		} else if (Boolean.TRUE.equals(isAccessToken) && Boolean.FALSE.equals(isRefreshToken)) {
			// accessToken은 만료가 되었고 refreshToken은 유효한 경우...
			response.sendError(ACCESS_EXPIRED);
			return;

		}

		if (accessToken == null) {
			filterChain.doFilter(request, response);
			return;
		}

		if (!accessToken.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		// Bearer 뒤 token만 가져오기
		String token = accessToken.split(" ")[1];

		Integer userId = JwtProvider.getUserId(token);

		String adminYn = JwtProvider.getAdminYn(token);

		SigninResponse signinUser = signinServiceImpl.getByUserId(userId);

		List<GrantedAuthority> authorities = new ArrayList<>();
		if ("y".equals(adminYn)) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		} else {
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		}

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				signinUser.getUserId(), null, authorities);

		authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		filterChain.doFilter(request, response);

	} // end doFilterInternal()

}// end class