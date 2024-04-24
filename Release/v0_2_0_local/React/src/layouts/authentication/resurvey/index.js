import React, { useState } from "react";
import {
  Card,
  AppBar,
  Tabs,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";

import backimage from "assets/images/youn/digdas.jpg";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import axios from "axios";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";

function Survey() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: "male",
    age: "young",
    goal: "Body fat reduction",
    level: "beginner",
    abnormal: "cardiovascular disease",
  });

  const [planData, setPlanData] = useState({
    planName: "",
    planDesc: "",
  });

  // Tab 저장
  const [genderTabValue, setGenderTabValue] = useState(0);
  const [ageTabValue, setAgeTabValue] = useState(0);
  const [goalTabValue, setGoalTabValue] = useState(0);
  const [levelTabValue, setLevelTabValue] = useState(0);
  const [abnormalTabValue, setabnormalTabValue] = useState(0);

  // 성별
  const handleGenderTabChange = (event, newValue) => {
    const newGender = newValue === 0 ? "male" : "female";
    setGenderTabValue(newValue);
    setFormData({ ...formData, gender: newGender });
  };

  // 나이
  const handleAgeTabChange = (event, newValue) => {
    const newAge = newValue === 0 ? "young" : "old";
    setAgeTabValue(newValue);
    setFormData({ ...formData, age: newAge });
  };

  // 운동목표
  const handleGoalTabChange = (event, newValue) => {
    // 목표에 따른 레이블을 객체로 매핑
    const goalOptions = {
      0: "Body fat reduction",
      1: "Muscle gain",
      2: "Overall health improvement",
    };
    // newValue를 사용하여 해당 목표를 찾음
    const newGoal = goalOptions[newValue];
    // 상태 업데이트
    setGoalTabValue(newValue); // 이 변수의 이름이 목적에 맞게 설정되었는지 확인하세요
    setFormData((prev) => ({
      ...prev,
      goal: newGoal,
    }));
  };

  // 운동수준
  const handleLevelTabChange = (event, newValue) => {
    // 목표에 따른 레이블을 객체로 매핑
    const levelOptions = {
      0: "beginner",
      1: "Intermediate",
      2: "advanced",
    };
    // newValue를 사용하여 해당 목표를 찾음
    const newLevel = levelOptions[newValue];
    // 상태 업데이트
    setLevelTabValue(newValue); // 이 변수의 이름이 목적에 맞게 설정되었는지 확인하세요
    setFormData((prev) => ({
      ...prev,
      level: newLevel,
    }));
  };

  // 건강이상
  const handleAbnormalTabChange = (event, newValue) => {
    // 목표에 따른 레이블을 객체로 매핑
    const abnormalOptions = {
      0: "cardiovascular disease",
      1: "musculoskeletal disorders",
      2: "respiratory diseases",
      3: "no health problems",
    };
    // newValue를 사용하여 해당 목표를 찾음
    const newAbnormal = abnormalOptions[newValue];
    // 상태 업데이트
    setabnormalTabValue(newValue); // 이 변수의 이름이 목적에 맞게 설정되었는지 확인하세요
    setFormData((prev) => ({
      ...prev,
      abnormal: newAbnormal,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
      },
    };
    console.log("Form submitting", formData);
    try {
      const response = await axios.post("http://127.0.0.1:8090/resurvey", formData, config);
      console.log("Response data:", response.data);
      setPlanData({
        planName: response.data.planName,
        planDesc: response.data.planDesc,
      });
      // Plan 페이지로 이동
      navigate("/authentication/replan", {
        state: { formData: formData, planData: response.data },
      });
      console.log("설문조사 후 plan 페이지 이동:", formData, planData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <BasicLayout>
      <AuthNavbar />
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SoftTypography variant="h3">사전 설문</SoftTypography>
      </SoftBox>
      <Card>
        <SoftBox
          component="form"
          role="form"
          onSubmit={handleSubmit}
          pt={2}
          pb={3}
          px={3}
        >
          <AppBar position="static">
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                1. 당신의 성별은?
              </SoftTypography>
            </SoftBox>
            <Tabs
              value={genderTabValue}
              onChange={handleGenderTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="남자" />
              <Tab label="여자" />
            </Tabs>
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                2. 당신의 연령대는?
              </SoftTypography>
            </SoftBox>
            <Tabs
              value={ageTabValue}
              onChange={handleAgeTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="35세 이하" />
              <Tab label="36세 이상" />
            </Tabs>
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                3. 당신의 운동 목표는?
              </SoftTypography>
            </SoftBox>
            <Tabs
              value={goalTabValue}
              onChange={handleGoalTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="체지방량 감소" />
              <Tab label="근육량 증가" />
              <Tab label="종합 건강" />
            </Tabs>
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                4. 당신의 운동 수준은?
              </SoftTypography>
            </SoftBox>
            <Tabs
              value={levelTabValue}
              onChange={handleLevelTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="입문" />
              <Tab label="중급" />
              <Tab label="전문가" />
            </Tabs>
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                5. 운동 시 주의가 필요한 건강 이상은?
              </SoftTypography>
            </SoftBox>
            <Tabs
              value={abnormalTabValue}
              onChange={handleAbnormalTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="심혈관계" />
              <Tab label="근골격계" />
              <Tab label="호흡기" />
              <Tab label="없음" />
            </Tabs>
          </AppBar>
          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
              맞춤 플랜 생성
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Survey;

