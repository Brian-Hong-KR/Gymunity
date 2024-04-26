package com.gymunity.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(AccountInactiveException.class)
	public ResponseEntity<String> handleAccountInactiveException(AccountInactiveException ex) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
	}

	@ExceptionHandler(ChallengeException.class)
	public ResponseEntity<String> handleChallengeException(ChallengeException ex) {
		// 400 Bad Request로 응답
		return ResponseEntity.badRequest().body(ex.getMessage());
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
		return ResponseEntity.badRequest().body(ex.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleException(Exception ex) {
		// 로그를 추가하여 예외 내용을 확인
		log.error("Unhandled exception: ", ex);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
	}

	@ExceptionHandler(ChallengeDuplicateEntryException.class)
	public ResponseEntity<String> handleChallengeDuplicateEntryException(ChallengeDuplicateEntryException ex) {
		log.error("Handled ChallengeDuplicateEntryException: ", ex);
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
	}
}// end GlobalExceptionHandler()
