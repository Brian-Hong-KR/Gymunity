package com.company.shop.auth;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

//[폼 기반 인증 처리 방식]
//폼 기반 인증에서는 일반적으로 사용자가 로그인 폼을 통해 아이디와 비밀번호를 입력하고, 서버는 이 정보를 받아서 인증 과정을 수행합니다
@WebServlet("/memlogin")
public class Auth02_FormBaiscAuthentication extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

            // 요청으로부터 사용자 이름과 비밀번호를 받아옵니다.
            String username = request.getParameter("username");
            String password = request.getParameter("password");

            // 여기서는 단순화를 위해 하드코딩된 사용자 이름과 비밀번호를 사용합니다.
            // 실제 애플리케이션에서는 데이터베이스에서 사용자 정보를 검증해야 합니다.
            if ("admin".equals(username) && "password".equals(password)) {
                // 로그인 성공 시, 사용자 세션을 생성합니다.
                HttpSession session = request.getSession();
                session.setAttribute("user", username);

                // 로그인 성공 페이지로 리다이렉트합니다.
                response.sendRedirect("welcome.jsp");
            } else {
                // 로그인 실패 시, 로그인 페이지로 다시 리다이렉트합니다.
                response.sendRedirect("login.jsp?error=1");
            }
        }
    }