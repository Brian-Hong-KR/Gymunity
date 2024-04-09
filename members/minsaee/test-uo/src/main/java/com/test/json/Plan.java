package com.test.json;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Plan {
    private String gender;
    private String age;
    private String goal;
    private String level;
    private String abnormal;
    private String plan_name;
    private String plan_desc;

    public String getPlanName() {
        return plan_name;
    }

    public void setPlanName(String plan_name) {
        this.plan_name = plan_name;
    }

    public String getPlanDesc() {
        return plan_desc;
    }

    public void setPlanDesc(String plan_desc) {
        this.plan_desc = plan_desc;
    }
}
