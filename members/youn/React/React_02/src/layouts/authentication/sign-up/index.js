import React, { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";

import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);

  const navigate = useNavigate();
  const location = useLocation();

  // location.state.planData가 배열인지 확인하고, 배열이면 첫 번째 요소를 사용하고, 아니면 그대로 사용
  const formData = Array.isArray(location.state?.formData)
    ? location.state.formData[0]
    : location.state?.formData;

  const planData = location.state?.planData;
  console.log("Registration successful:", planData);

  const [user, setUser] = useState({
    userAccountId: "",
    nickName: "",
    password: "",
    userEmail: "",
    referrerAccountId: "",
    gender: formData?.gender || "",
    age: formData?.age || "",
    goal: formData?.goal || "",
    level: formData?.level || "",
    abnormal: formData?.abnormal || "",
    planName: planData?.plan_name || "",
    planDesc: planData?.plan_desc || "",
  });

  const handleValueChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!agreement) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // survey 데이터가 배열이면 첫 번째 요소를 사용하고, 배열이 아니면 그대로 사용
    // const surveyData = Array.isArray(planData) ? planData[0] : planData;

    try {
      const response = await axios.post(
        '/user/signup',
        user
      );
      console.log("Registration successful:", response);
      navigate("/dashboard"); // 회원가입 후 메인 페이지로 이동
    } catch (error) {
      if (error.response) {
        alert(`${error.response.data}`);
      } else {
        alert("Please try again later.");
      }
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
        <SoftTypography variant="h3">회원 가입</SoftTypography>
      </SoftBox>

      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={onSubmit}>
            <SoftBox mb={2}></SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="userAccountId"
                value={user.userAccountId}
                onChange={handleValueChange}
                placeholder="아이디"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                name="userEmail"
                value={user.userEmail}
                onChange={handleValueChange}
                placeholder="이메일"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                name="password"
                value={user.password}
                onChange={handleValueChange}
                placeholder="비밀번호"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="nickName"
                value={user.nickName}
                onChange={handleValueChange}
                placeholder="닉네임"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="referrerAccountId"
                value={user.referrerAccountId}
                onChange={handleValueChange}
                placeholder="추천인"
              />
            </SoftBox>
            <SoftBox display="flex" flexDirection="column">
              <SoftBox mb={1} display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={handleSetAgremment} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "pointer", userSelect: "none" }}
                >
                  이용 약관 동의 (필수)
                </SoftTypography>
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={handleSetAgremment} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "pointer", userSelect: "none" }}
                >
                  개인정보 수집 및 이용 동의 (필수)
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                type="submit"
                variant="gradient"
                color="dark"
                fullWidth
              >
                가입완료
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                이미 아이디가 있으신가요?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  로그인하기
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
