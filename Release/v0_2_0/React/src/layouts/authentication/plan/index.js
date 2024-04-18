import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Images
import digdas from "assets/images/youn/digdas.jpg";
import { Card } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";


const PlanPage = () => {
  const { d1, h2, fontWeightMedium } = typography;

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    if (
      location.state &&
      location.state.planData &&
      location.state.planData.length > 0
    ) {
      console.log("Plan data received:", location.state.planData[0]);
      setPlanData(location.state.planData[0]);
    } else {
      console.log("No plan data received.");
    }

    // Check and set formData if it's present in the location state
    if (location.state && location.state.formData) {
      console.log("Form data received:", location.state.formData);
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleRegister = () => {
    // 현재 location 상태를 `/authentication/sign-in` 페이지로 전달
    navigate("/authentication/sign-up", {
      state: { planData: planData, formData: formData },
    });
    console.log("planPage후 회원가입페이지 이동:", formData, planData);
  };

  const handleSurveyReset = () => {
    navigate("/authentication/survey");
  };

  return (
  <DashboardLayout>
    <AuthNavbar />
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h3">맞춤 운동 플랜</SoftTypography>
      </SoftBox>

      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            {planData && (
              <>
                <p>{planData.plan_name}</p>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: planData.plan_desc }} />
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
    </DashboardLayout>
  );
};

export default PlanPage;
