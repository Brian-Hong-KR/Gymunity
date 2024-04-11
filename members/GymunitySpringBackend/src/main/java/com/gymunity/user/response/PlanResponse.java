package com.gymunity.user.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gymunity.user.entity.Survey;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanResponse {

	@JsonProperty("plan_name")
	private String planName;

	@JsonProperty("plan_desc")
	private String planDesc;

}// end class
