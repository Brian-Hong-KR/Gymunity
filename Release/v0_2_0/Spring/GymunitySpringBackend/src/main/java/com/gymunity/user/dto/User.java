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
	private LocalDateTime lastSignin;
	private String gradeName;

}// end class
