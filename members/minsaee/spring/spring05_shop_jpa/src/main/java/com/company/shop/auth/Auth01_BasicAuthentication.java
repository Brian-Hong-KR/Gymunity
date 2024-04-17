package com.company.shop.auth;

import java.io.IOException;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//https://engineerinsight.tistory.com/69
//HTTP 기본 인증 (HTTP Basic Authentication): 인코딩처리 
public class Auth01_BasicAuthentication {
	 private static final Logger logger = LoggerFactory.getLogger(Auth01_BasicAuthentication.class);
	    public static void main(String[] args) throws URISyntaxException, IOException, InterruptedException {
	        HttpClient client = HttpClient.newBuilder()
	                .authenticator(new Authenticator() {
	                    @Override
	                    protected PasswordAuthentication getPasswordAuthentication() {
	                        return new PasswordAuthentication("postman", "password".toCharArray());
	                    }
	                })
	                .build();

	        // request를 보낼 때, header의 "Authorization"에 인증을 위한 정보를 암호화해서 넣는다. 
	        HttpRequest request = HttpRequest.newBuilder()
	                .GET()
	                .uri(new URI("https://postman-echo.com/basic-auth"))
	                .header("Authorization", getBasicAuthenticationHeader("postman", "password"))
	                .build();

	        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

	        logger.info("Status {}", response.statusCode());
	    }

	    // 인증 관련 정보(credential)을 암호화하고, 전송 형식에 맞게 반환한다. 
	    private static final String getBasicAuthenticationHeader(String username, String password) {
	        String valueToEncode = username + ":" + password;
	        return "Basic " + Base64.getEncoder().encodeToString(valueToEncode.getBytes());
	    }
	}


