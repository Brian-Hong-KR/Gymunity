package com.gymunity.user.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDTO {
	private String title;
	private String content;
	private LocalDate inquiryDate;
}