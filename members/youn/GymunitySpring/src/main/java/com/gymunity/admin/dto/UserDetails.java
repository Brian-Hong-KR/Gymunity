package com.gymunity.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetails {
	private int userId;
	private String userAccountId;
    private String nickName;
    private String gradeName;
    private String lastSignin;
    private String isActive;
    private String userEmail;

}
