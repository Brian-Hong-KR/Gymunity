package com.test.json;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import java.io.File;
import java.io.FileReader;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class SurveyController {

    @PostMapping("/processSurvey")
    public ResponseEntity<?> processSurvey(@RequestBody SurveyFormData formData) {
        try {
            // 프론트엔드에서 전송한 설문조사 데이터를 받아옴
            String gender = formData.getGender();
            String age = formData.getAge();
            String goal = formData.getGoal();
            String level = formData.getLevel();
            String abnormal = formData.getAbnormal();

            // JSON 파일에서 plan_name과 plan_desc를 찾아 반환
            List<Plan> plans = loadPlansFromJson();
            String planName = "";
            String planDesc = "";
            for (Plan plan : plans) {
                if (plan.getGender().equals(gender)
                    && plan.getAge().equals(age)
                    && plan.getGoal().equals(goal)
                    && plan.getLevel().equals(level)
                    && plan.getAbnormal().equals(abnormal)) {
                        planName = plan.getPlanName();
                        planDesc = plan.getPlanDesc();
                        break;
                    }
            }

            // 프론트엔드로 찾은 결과를 보냄
            return ResponseEntity.ok(new SurveyResult(planName, planDesc));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing survey: " + e.getMessage());
        }
    }

    // JSON 파일에서 plan 데이터를 읽어옴
    private List<Plan> loadPlansFromJson() throws Exception {
        File file = ResourceUtils.getFile("classpath:pt_plan.json");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new FileReader(file), new TypeReference<List<Plan>>(){});
    }
}
