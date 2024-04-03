package com.test.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	private final RedisTemplate<String, Object> redisTemplate;

	public TokenService(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;

	}

	// redisTemplate를 이용해서 데이터 저장
	public void saveTokens(String userAccoutId, String accessToken, String refreshToken) {
		redisTemplate.opsForValue().set(userAccoutId + ":accessToken:", accessToken);
		redisTemplate.opsForValue().set(userAccoutId + ":refreshToken", refreshToken);
	}

	// redisTemplate를 이용해서 데이터 조회
	public Object getAccessToken(String userAccoutId) {
		return redisTemplate.opsForValue().get(userAccoutId + ":accessToken");
	}

	public Object getRefreshToken(String userAccoutId) {
		return redisTemplate.opsForValue().get(userAccoutId + ":refreshToken");
	}

	// redisTemplate를 이용해서 데이터 삭제
	public void deleteTokens(String userAccoutId) {
		redisTemplate.delete(userAccoutId + ":accessToken");
		redisTemplate.delete(userAccoutId + ":refreshToken");
	}

} // end class