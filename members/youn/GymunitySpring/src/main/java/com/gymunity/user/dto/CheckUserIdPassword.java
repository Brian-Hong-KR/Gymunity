package com.gymunity.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckUserIdPassword {
	private int userId;
	private String userAccountId;
	private String password;
}// end class
