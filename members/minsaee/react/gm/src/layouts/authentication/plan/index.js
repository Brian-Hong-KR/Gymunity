import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// VR dashboards components
import BaseLayout from "layouts/virtual-reality/components/BaseLayout";

// VRInfo dashboards components
import TodoList from "layouts/virtual-reality/components/TodoList";
import TodoCard from "layouts/virtual-reality/components/TodoCard";
import Emails from "layouts/virtual-reality/components/Emails";
import MediaPlayer from "layouts/virtual-reality/components/MediaPlayer";
import Messages from "layouts/virtual-reality/components/Messages";

// Images
import team1 from "assets/images/team-1.jpg";
import sunCloud from "assets/images/small-logos/icon-sun-cloud.png";

const PlanPage = () => {
  const { d1, h2, fontWeightMedium } = typography;

  const navigate = useNavigate();
  const location = useLocation();
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
  }, [location.state]);

  const handleRegister = () => {
    // 현재 location 상태를 `/authentication/sign-in` 페이지로 전달
    navigate("/authentication/sign-up", { state: { planData: planData } });
  };

  const handleSurveyReset = () => {
    navigate("/authentication/survey");
  };

  return (
    <BaseLayout>
      <SoftBox
        minHeight="100vh"
        ml={{ xs: 0, md: 10 }}
        mt={{ xs: 0, md: 4 }}
        pt={{ xs: 16, md: 32 }}
        pb={{ xs: 0, md: 3 }}
        sx={{ transform: "scale(1.1)" }}
      >
        <Grid container>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              2. 당신의 연령대는?
            </SoftTypography>
            {planData && (
              <>
                <p>{planData.plan_name}</p>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: planData.plan_desc }} />
                <hr />
              </>
            )}

            <hr />
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
              <SoftButton
                type="button"
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleSurveyReset}
              >
                설문 다시 하기
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Grid>
      </SoftBox>
    </BaseLayout>
  );
};

export default PlanPage;
