import React, { useState } from "react";
import { Card, AppBar, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";

import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import axios from "axios";
import { gConst } from "layouts/gConst";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";

function ReSurvey() {
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

  const [genderTabValue, setGenderTabValue] = useState(0);
  const [ageTabValue, setAgeTabValue] = useState(0);
  const [goalTabValue, setGoalTabValue] = useState(0);
  const [levelTabValue, setLevelTabValue] = useState(0);
  const [abnormalTabValue, setabnormalTabValue] = useState(0);

  const handleGenderTabChange = (event, newValue) => {
    const newGender = newValue === 0 ? "male" : "female";
    setGenderTabValue(newValue);
    setFormData({ ...formData, gender: newGender });
  };

  const handleAgeTabChange = (event, newValue) => {
    const newAge = newValue === 0 ? "young" : "old";
    setAgeTabValue(newValue);
    setFormData({ ...formData, age: newAge });
  };

  const handleGoalTabChange = (event, newValue) => {
    const goalOptions = {
      0: "Body fat reduction",
      1: "Muscle gain",
      2: "Overall health improvement",
    };

    const newGoal = goalOptions[newValue];
    setGoalTabValue(newValue);
    setFormData((prev) => ({
      ...prev,
      goal: newGoal,
    }));
  };

  const handleLevelTabChange = (event, newValue) => {
    const levelOptions = {
      0: "beginner",
      1: "Intermediate",
      2: "advanced",
    };

    const newLevel = levelOptions[newValue];
    setLevelTabValue(newValue);
    setFormData((prev) => ({
      ...prev,
      level: newLevel,
    }));
  };

  const handleAbnormalTabChange = (event, newValue) => {
    const abnormalOptions = {
      0: "cardiovascular disease",
      1: "musculoskeletal disorders",
      2: "respiratory diseases",
      3: "no health problems",
    };
    const newAbnormal = abnormalOptions[newValue];
    setabnormalTabValue(newValue);
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
    try {
      const response = await axios.post(
        `${gConst.API_BASE_URL}:8090/resurvey`,
        formData,
        config
      );
      setPlanData({
        planName: response.data.planName,
        planDesc: response.data.planDesc,
      });

      navigate("/authentication/replan", {
        state: { formData: formData, planData: response.data },
      });
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
      ></SoftBox>
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

export default ReSurvey;
