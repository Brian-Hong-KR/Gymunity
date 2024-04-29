package com.gymunity.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	private final RedisTemplate<String, Object> redisTemplate;

	public TokenService(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}// end TokenService()

	// redisTemplate를 이용해서 데이터 저장
	public void saveTokens(int userId, String accessToken, String refreshToken) {
		redisTemplate.opsForValue().set(userId + ":accessToken", accessToken);
		redisTemplate.opsForValue().set(userId + ":refreshToken", refreshToken);
	}// end saveTokens()

	// redisTemplate를 이용해서 데이터 조회
	public Object getAccessToken(int userId) {
		return redisTemplate.opsForValue().get(userId + ":accessToken");
	}// end getAccessToken()
	public Object getRefreshToken(int userId) {
		return redisTemplate.opsForValue().get(userId + ":refreshToken");
	}// end getRefreshToken()

	// redisTemplate를 이용해서 데이터 삭제
	public void deleteTokens(int userId) {
		redisTemplate.delete(userId + ":accessToken");
		redisTemplate.delete(userId + ":refreshToken");
	}// end deleteTokens()

} // end class