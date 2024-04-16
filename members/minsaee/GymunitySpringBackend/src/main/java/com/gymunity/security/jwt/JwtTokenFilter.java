package com.gymunity.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
//	private static final int ACCESS_EXPIRED = 701;
//	private static final int REFRESH_EXPIRED = 702;
//	private static final int DOUBLE_EXPIRED = 703;

	private final SigninServiceImpl signinServiceImpl;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String accessToken = request.getHeader("Authorization");
		log.info("accessToken:{}", accessToken);

		String refreshToken = request.getHeader("Authorization-refresh");
		log.info("refreshToken:{}", refreshToken);

		Boolean isAccessTokenExpired = null;
		Boolean isRefreshTokenExpired = null;

		if (accessToken != null && accessToken.startsWith("Bearer ")) {
			accessToken = accessToken.substring(7);
			isAccessTokenExpired = JwtProvider.isExpired(accessToken);
			isRefreshTokenExpired = (refreshToken != null) ? JwtProvider.isExpired(refreshToken) : true;
			log.info("isAccessTokenExpired : " + isAccessTokenExpired);
			log.info("isRefreshTokenExpired : " + isRefreshTokenExpired);
		}

		if (Boolean.TRUE.equals(isAccessTokenExpired) && Boolean.FALSE.equals(isRefreshTokenExpired)) {
			// accessToken 만료되었고 refreshToken은 유효할 때
			// refreshToken을 사용하여 accessToken을 재발급 받아야 합니다.
			Integer userId = JwtProvider.getUserId(refreshToken); // userId를 refreshToken에서 추출
			SigninResponse signinUser = signinServiceImpl.generateAndReturnUserAuthTokens(userId);
			accessToken = signinUser.getAccessToken(); // 새 accessToken

			// Update the Security Context with the new authentication token
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					signinUser.getUserAccountId(), null, null);
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);

			// Update the Authorization header of the request
			request.setAttribute("Authorization", "Bearer " + accessToken);
		}

		if (Boolean.TRUE.equals(isAccessTokenExpired) && Boolean.TRUE.equals(isRefreshTokenExpired)) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Both tokens expired");
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

		filterChain.doFilter(request, response);

	} // end doFilterInternal()

}// end class