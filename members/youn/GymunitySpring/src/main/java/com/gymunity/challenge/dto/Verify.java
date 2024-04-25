package com.gymunity.challenge.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Verify {
	private int viId;
	private int userId;
	private int chId;
	private String upload1;
	private String upload2;
	private String result;
	private LocalDateTime updateVerify;

}//end class
