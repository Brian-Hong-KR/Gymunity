package com.company.shop.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	private final RedisTemplate<String, Object> redisTemplate;

	public TokenService(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	// RedisTemplate을 이용한 데이터 저장
	public void saveTokens(String memberEmail, String accessToken, String refreshToken) {
		redisTemplate.opsForValue().set(memberEmail + ":accessToken", accessToken);
		redisTemplate.opsForValue().set(memberEmail + ":refreshToken", refreshToken);
	}

	// RedisTemplate을 이용한 데이터 조회
	public Object getAccessToken(String memberEmail) {
		return redisTemplate.opsForValue().get(memberEmail + ":accessToken");
	}

	public Object getRefreshToken(String memberEmail) {
		return redisTemplate.opsForValue().get(memberEmail + ":refreshToken");
	}

	// RedisTemplate을 이용한 데이터 삭제
	public void deleteTokens(String memberEmail) {
		redisTemplate.delete(memberEmail + ":accessToken");
		redisTemplate.delete(memberEmail + ":refreshToken");
	}
}
