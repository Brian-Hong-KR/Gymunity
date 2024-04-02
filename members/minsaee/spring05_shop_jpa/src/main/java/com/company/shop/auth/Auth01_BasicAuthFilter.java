package com.company.shop.auth;

import java.io.IOException;
import java.util.Base64;
import java.util.StringTokenizer;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
// [HTTP 기본 인증 (HTTP Basic Authentication)] -디코딩처리
// HTTP 기본 인증에서는 클라이언트가 서버로 요청을 보낼 때 HTTP 헤더에 사용자 이름과 비밀번호를 인코딩하여 포함시킵니다. 서버는 이 정보를 디코딩하여 인증을 수행합니다. 
public class Auth01_BasicAuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authHeader = httpRequest.getHeader("Authorization");
        if (authHeader != null) {
            StringTokenizer st = new StringTokenizer(authHeader);
            if (st.hasMoreTokens()) {
                String basic = st.nextToken();
                if (basic.equalsIgnoreCase("Basic")) {
                    try {
                        String credentials = new String(Base64.getDecoder().decode(st.nextToken()), "UTF-8");
                        int p = credentials.indexOf(":");
                        if (p != -1) {
                            String username = credentials.substring(0, p).trim();
                            String password = credentials.substring(p + 1).trim();

                            // 인증 로직 (이 부분은 실제 인증 로직으로 대체해야 합니다.)
                            if ("user".equals(username) && "password".equals(password)) {
                                chain.doFilter(request, response);
                            } else {
                                unauthorized(response);
                            }
                        } else {
                            unauthorized(response);
                        }
                    } catch (IOException e) {
                        unauthorized(response);
                    }
                } else {
                    unauthorized(response);
                }
            } else {
                unauthorized(response);
            }
        } else {
            unauthorized(response);
        }
    }

    private void unauthorized(ServletResponse response) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader("WWW-Authenticate", "Basic realm=\"Access to the site\"");
        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}