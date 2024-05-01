import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Card } from "@mui/material";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";
import ReactMarkdown from "react-markdown";

const PlanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    setPlanData(location.state?.planData?.[0] || null);
    setFormData(location.state?.formData || null);
  }, [location.state]);

  const handleRegister = () => {
    navigate("/authentication/sign-up", {
      state: { planData, formData },
    });
  };

  const handleSurveyReset = () => {
    navigate("/authentication/survey");
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
                회원가입
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

export default PlanPage;
