import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Card } from "@mui/material";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const Replan = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    setPlanData(location.state?.planData?.[0] || null);
    setFormData(location.state?.formData || null);
  }, [location.state]);

  const [surveyData, setSurveyData] = useState({
    gender: "",
    age: "",
    goal: "",
    level: "",
    abnormal: "",
    planName: "",
    planDesc: "",
  });

  useEffect(() => {
    if (formData && planData) {
      setSurveyData({
        gender: formData.gender || "",
        age: formData.age || "",
        goal: formData.goal || "",
        level: formData.level || "",
        abnormal: formData.abnormal || "",
        plan_name: planData.plan_name || "",
        plan_desc: planData.plan_desc || "",
      });
    }
  }, [formData, planData]);

  const handleRegister = async () => {
    try {
      await axios.put("/user/resurvey", surveyData, config);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to resubmit the survey:", error);
      alert("설문 다시하기에 실패했습니다.");
    }
  };

  const handleSurveyReset = () => {
    navigate("/authentication/resurvey");
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
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            {planData && (
              <>
                <p>{planData.plan_name}</p>
                <hr />
                <ReactMarkdown children={planData.plan_desc} />
                <hr />
              </>
            )}
            <SoftBox mt={4} mb={1}>
              <SoftButton
                type="button"
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleRegister}
              >
                마이페이지
              </SoftButton>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                type="button"
                variant="gradient"
                color="white"
                fullWidth
                onClick={handleSurveyReset}
              >
                설문 다시 하기
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
};

export default Replan;
