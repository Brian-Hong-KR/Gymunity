package com.gymunity.user.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
	private int userId;
	private String userAccountId;
	private String nickName;
	private String adminYn;
	private String gradeName;
	private LocalDateTime lastSignin;
	private String isActive;

}// end class
