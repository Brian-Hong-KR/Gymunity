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
	public void saveTokens(String userAccountId, String accessToken, String refreshToken) {
		redisTemplate.opsForValue().set(userAccountId + ":accessToken", accessToken);
		redisTemplate.opsForValue().set(userAccountId + ":refreshToken", refreshToken);
	}

	// redisTemplate를 이용해서 데이터 조회
	public Object getAccessToken(String userAccountId) {
		return redisTemplate.opsForValue().get(userAccountId + ":accessToken");
	}

	public Object getRefreshToken(String userAccountId) {
		return redisTemplate.opsForValue().get(userAccountId + ":refreshToken");
	}

	// redisTemplate를 이용해서 데이터 삭제
	public void deleteTokens(String userAccountId) {
		redisTemplate.delete(userAccountId + ":accessToken");
		redisTemplate.delete(userAccountId + ":refreshToken");
	}

} // end class