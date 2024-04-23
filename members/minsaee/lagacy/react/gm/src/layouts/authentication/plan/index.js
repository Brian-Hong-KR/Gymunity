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
import BasicLayout from "../components/BasicLayout";
//   return (
//     <BaseLayout>
//       <SoftBox
//         minHeight="100vh"
//         ml={{ xs: 0, md: 10 }}
//         mt={{ xs: 0, md: 4 }}
//         pt={{ xs: 16, md: 32 }}
//         pb={{ xs: 0, md: 3 }}
//         sx={{ transform: "scale(1.1)" }}
//       >
//         <Grid container>
//           <SoftBox p={3} mb={1} textAlign="center">
//             <SoftTypography variant="h5" fontWeight="medium">
//               2. 당신의 연령대는?
//             </SoftTypography>
//             {planData && (
//               <>
//                 <p>{planData.plan_name}</p>
//                 <hr />
//                 <div dangerouslySetInnerHTML={{ __html: planData.plan_desc }} />
//                 <hr />
//               </>
//             )}

//             <hr />
//             <SoftBox mt={4} mb={1}>
//               <SoftButton
//                 type="button"
//                 variant="gradient"
//                 color="dark"
//                 fullWidth
//                 onClick={handleRegister}
//               >
//                 회원가입
//               </SoftButton>
//               <SoftButton
//                 type="button"
//                 variant="gradient"
//                 color="dark"
//                 fullWidth
//                 onClick={handleSurveyReset}
//               >
//                 설문 다시 하기
//               </SoftButton>
//             </SoftBox>
//           </SoftBox>
//         </Grid>
//       </SoftBox>
//     </BaseLayout>
//   );
// };

// export default PlanPage;

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
    <BasicLayout title="운동유형" description="해라" image={digdas}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftTypography variant="h5" fontWeight="medium">
              잠온다
            </SoftTypography>
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
        </SoftBox>
      </Card>
    </BasicLayout>
  );
};

export default PlanPage;
