import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";
import { Card } from "@mui/material";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [inputs, setInputs] = useState({ userAccountId: "", password: "" });
  
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.userAccountId || !inputs.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    await axios
      .post("http://192.168.0.60:8090/user/signin", inputs)
      .then((response) => {
        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        localStorage.setItem("Authorization", accessToken);
        localStorage.setItem("Authorization-refresh", refreshToken);
        localStorage.setItem("userAccountId", response.data.userAccountId);
        localStorage.setItem("nickName", response.data.nickName);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isAdmin", response.data.adminYn);
        localStorage.setItem("isLogin", true);

        setInputs({ userAccountId: "", password: "" });
      })
      .then((response) => {
        window.location.replace("/profile");
      })
      .catch((error) => console.log(error));
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
        <SoftTypography variant="h3">로그인</SoftTypography>
      </SoftBox>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={onSubmit}>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  아이디
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                placeholder="아이디"
                value={inputs.userAccountId}
                onChange={(e) =>
                  setInputs({ ...inputs, userAccountId: e.target.value })
                }
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Password
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="password"
                placeholder="비밀번호"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;아이디 기억하기
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                type="submit"
                variant="gradient"
                color="dark"
                fullWidth
              >
                로그인
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Don&apos;t have an account?{" "}
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  회원가입
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
