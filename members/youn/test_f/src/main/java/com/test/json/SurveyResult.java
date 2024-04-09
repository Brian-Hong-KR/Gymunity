package com.test.json;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SurveyResult {
    private String planName;
    private String planDesc;

    public SurveyResult() {
		// TODO Auto-generated constructor stub
	}
    
    public SurveyResult(String planName, String planDesc) {
        this.planName = planName;
        this.planDesc = planDesc;
    }
    
    

}
