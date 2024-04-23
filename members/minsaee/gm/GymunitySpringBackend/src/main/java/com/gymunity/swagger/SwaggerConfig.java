package com.gymunity.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

//http://localhost:8090/swagger-ui/index.html#/
@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		// API 정보 설정 (버전, 제목, 설명)
		Info info = new Info().version("v1.0.0").title("API").description("");

		// 보안 스키마 이름 설정
		String accessToken = "Access Token (Bearer)";
		String refreshToken = "Refresh Token";

		// 보안 요구 사항 설정
		SecurityRequirement securityRequirement = new SecurityRequirement().addList(accessToken).addList(refreshToken);

		// JWT 액세스 토큰을 위한 보안 스키마 설정
		// HTTP 스키마 타입 (type)
		// Bearer 인증 스키마 (scheme)
		// JWT 포맷 (bearerFormat)
		// 헤더에 위치 (in)
		// 인증 헤더 이름 (name)
		SecurityScheme accessTokenSecurityScheme = new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer")
				.bearerFormat("JWT").in(SecurityScheme.In.HEADER).name("Authorization");

		SecurityScheme refreshTokenSecurityScheme = new SecurityScheme().type(SecurityScheme.Type.APIKEY)
				.in(SecurityScheme.In.HEADER).name("Authorization-refresh");

		// 보안 스키마를 컴포넌트로 추가
		Components components = new Components().addSecuritySchemes(accessToken, accessTokenSecurityScheme)
				.addSecuritySchemes(refreshToken, refreshTokenSecurityScheme);

		// OpenAPI 객체를 생성하여 구성한 정보 반환
		// API 정보 추가 (info)
		// 보안 요구 사항 추가 (addSecurityItem)
		// 컴포넌트 추가 (components)
		return new OpenAPI().info(info).addSecurityItem(securityRequirement).components(components);
	}// end openAPI()

}// end class
