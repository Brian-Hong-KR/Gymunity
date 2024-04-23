package com.gymunity.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component // 스프링이 관리하는 컴포넌트로 선언
@RequiredArgsConstructor // Lombok을 사용해 필요한 생성자 자동 생성
@Slf4j
public class JwtProvider {

	private static SecretKey key; // JWT 서명에 사용될 비밀 키

	@PostConstruct // 객체 생성 이후 초기화를 위한 메서드
	public void init() {
		// BASE64 인코딩된 비밀 키로부터 실제 키 생성
		key = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(JwtProperties.SECRET_KEY));
	}// end init()

	// AccessToken 생성
	public static String createAccessToken(Integer userId, String adminYn) {
		Map<String, Object> claims = new HashMap<>(); // JWT 클레임 설정
		claims.put("userId", userId); // 사용자 ID를 클레임에 포함
		claims.put("adminYn", adminYn);

		return Jwts.builder().claims(claims).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
				.signWith(key, Jwts.SIG.HS512).subject("accessToken").compact();
	}// end createAccessToken()

	// RefreshToken 생성
	public static String createRefreshToken(Integer userId, String adminYn) {
		Map<String, Object> claims = new HashMap<>();
//		claims.put("userId", String.valueOf(userId));
		claims.put("userId", userId);
		claims.put("adminYn", adminYn);

		String refreshToken = Jwts.builder().claims(claims).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
				.signWith(key, Jwts.SIG.HS512).subject("refreshToken").compact();

		return refreshToken;
	}// end createRefreshToken()

	// SecretKey로 Token Parsing 키로 서명 확인(verifyWith)
	public static Claims extractClaims(String token) throws ExpiredJwtException {
		Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
		log.info("claims: {}, {}", claims.getSubject(), claims.getExpiration());

		return claims;
	}// end extractClaims()

	public static int getUserId(String token) {
		Claims claims = extractClaims(token);
		return claims.get("userId", Integer.class);
	} // end getUserId()

	public static String getAdminYn(String token) {
		Claims claims = extractClaims(token);

		String adminYn = claims.get("adminYn", String.class);
		return adminYn;
	} // end getAdminYn()

	// Token 만료시간 확인
	public static boolean isExpired(String token) {
		Date expiredDate = null;
		try {
			expiredDate = extractClaims(token).getExpiration();
			log.info("expiredDate: {}", expiredDate);
		} catch (ExpiredJwtException e) {
			return true; // 토큰 만료 예외가 발생한 경우 만료된 것으로 판단
		}
		// Token 만료날짜가 지금보다 이전인지 확인
		return expiredDate.before(new Date());
	}// end isExpired()

	// 토큰 검증
	public static boolean validateToken(String token) {
		try {
			// Bearer 검증
			if (!token.substring(0, "BEARER ".length()).equalsIgnoreCase("BEARER ")) {
				return false;
			} else {
				token = token.split(" ")[1].trim();
			}

			// 토큰 서명 및 구조 검증
			Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(token);
			return true; // 검증에 성공하면 true 반환
		} catch (SecurityException | MalformedJwtException e) {

			log.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			log.info("만료된 JWT 서명입니다.");
		} catch (UnsupportedJwtException e) {
			log.info("지원하지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {
			log.info("JWT 토큰이 잘못되었습니다.");
		}

		return false; // 검증에 실패한 경우 false 반환

	}// validateToken()
}// end class
