package com.test.security.jwt;

public interface JwtProperties {

	public String SECRET_KEY = "dskskdskdjflkasdjfkleiwj123123123135jdlgfjnsdlgkjeprigjerlk2j35k245klndgfgfgn23k03u94l1lllsdfl";

	public int EXPIRATION_TIME = 86400000;// 1일
	public int REFRESH_EXPIRATION_TIME = 864000000; // 10일
	public String TOKEN_PREFIX = "Bearer ";
	public String HEADER_STRING = "Authorization";
	public String HEADER_REFRESH_STRING = "Authorization-refresh";

}

//1000 밀리초 = 1초  
//1일은 1000 * 60 * 60 * 24 *1L= 86400000
//10일은 1000 * 60 * 60 * 24 *10L= 860400000
//30분은 1000 * 60 * 30 * 1L = 1800000

//refresh 토큰 유효시간
//private Date refreshTokenValidTime =new
//Date(System.currentTimeMillis()+(1000*60*60*24*7L)); //7일
//private long refreshTokenValidTime = 1 * 60 * 1000 *1L; // 1분
//public static final int EXPIRATION_TIME = 864000000; // 10 days