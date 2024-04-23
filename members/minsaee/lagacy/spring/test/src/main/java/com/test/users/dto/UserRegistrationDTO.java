package com.test.users.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRegistrationDTO {
	private UsersDTO usersDTO;
	private Survey survey;
	private Point point;

}
