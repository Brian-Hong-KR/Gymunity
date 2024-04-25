package com.gymunity.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDeleteUserDTO {

	 private String userAccountId;

	    public String getUserAccountId() {
	        return userAccountId;
	    }

	    public void setUserAccountId(String userAccountId) {
	        this.userAccountId = userAccountId;
	    }
}
