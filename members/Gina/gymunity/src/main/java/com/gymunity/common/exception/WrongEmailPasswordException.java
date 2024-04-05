package com.gymunity.common.exception;

public class WrongEmailPasswordException extends RuntimeException {

	public WrongEmailPasswordException(String message) {
		super(message);
	}

}
