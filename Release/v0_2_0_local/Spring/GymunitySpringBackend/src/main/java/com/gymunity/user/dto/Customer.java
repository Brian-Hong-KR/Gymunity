package com.gymunity.user.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Customer {
	private String title;
	private String content;
	private LocalDate inquiryDate;
	private int userId;
	private String userEmail;
}