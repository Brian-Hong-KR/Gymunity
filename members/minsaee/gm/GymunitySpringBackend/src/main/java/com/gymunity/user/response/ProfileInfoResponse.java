package com.gymunity.user.response;

import java.util.List;

import com.gymunity.user.dto.ProfileInfoChallengeDTO;
import com.gymunity.user.dto.WeeklyPointsDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileInfoResponse {
	private String nickName;
	private String userEmail;
	private String gradeName;
	private int currentPoints;
	private String planName;
	private int pointToNextGrade;
	private List<ProfileInfoChallengeDTO> challenges;
	private List<WeeklyPointsDTO> weeklyPoints;

}
