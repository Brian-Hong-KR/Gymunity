/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [inputs, setInputs] = useState({ userAccountId: "", password: "" });

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/user/signin", inputs)
      .then((response) => {
        //console.log(response);
        //let jwtToken = response.headers["authorization"];
        //let jwtToken = response.headers.get('authorization');
        //let refreshToken = response.headers.get('refreshToken');
        //console.log(jwtToken);
        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        localStorage.setItem("Authorization", accessToken);
        localStorage.setItem("Authorization-refresh", refreshToken);
        localStorage.setItem("userAccountId", response.data.userAccountId);
        localStorage.setItem("nickName", response.data.nickName);
        localStorage.setItem("isLogin", true);

        setInputs({ userAccountId: "", password: "" });
        //return response.data.memberEmail;
      })
      .then((response) => {
        //console.log("then", response);
        window.location.replace("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <CoverLayout
      title="어서왕"
      description="이메일이랑 비밀번호 쳐서 로그인하도록 해"
      image={curved9}
    >
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
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
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
            &nbsp;&nbsp;아이디 기억하게 할랭?
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
