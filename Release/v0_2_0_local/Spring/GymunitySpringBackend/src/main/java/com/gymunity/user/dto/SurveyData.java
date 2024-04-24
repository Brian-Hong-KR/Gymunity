package com.gymunity.user.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SurveyData {
	private String gender;
	private String age;
	private String goal;
	private String level;
	private String abnormal;
	private int userId;
	@JsonProperty("plan_name")
	private String planName;
	@JsonProperty("plan_desc")
	private String planDesc;
	@JsonProperty("daily_program")
	private List<String> dailyProgram;
	private List<String> videoList;
}
