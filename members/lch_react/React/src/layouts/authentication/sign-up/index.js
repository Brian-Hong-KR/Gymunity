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
  const [termAgreement, setTermAgreement] = useState(true);
  const [privacyAgreement, setPrivacyAgreement] = useState(true);
  const [checkedId, setCheckedId] = useState("");
  const [checkedName, setCheckedName] = useState("");
  
  const handleSetTermAgreement = () => setTermAgreement(!termAgreement);
  const handleSetPrivacyAgreement = () => setPrivacyAgreement(!privacyAgreement);

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

  
  const clearInputField = () => {
    // 아이디 입력 필드를 비웁니다.
    setUser(prevUser => ({ ...prevUser, userAccountId: '' }));
  };
  
  const clearNameInputField = () => {
    // 닉네임 입력 필드를 비웁니다.
    setUser(prevUser => ({ ...prevUser, nickName: '' }));
  };

  // 닉네임 중복 체크
  const handleCheckName = async () => {

    // 입력값이 비어 있는지 확인
    if (!user.nickName.trim()) {
      alert("닉네임을 입력하세요.");
      return;
    }

      try {
      const response = await axios.get(`/checkUsername/${user.nickName}`);
      
      if (response.status === 200) {
        alert("사용할 수 있는 닉네임입니다.");
        setCheckedName("Y");
      } else {
        console.error("Unexpected status code:", response.status);
        clearNameInputField();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 존재하는 닉네임입니다.");
        clearNameInputField(); 
      } else {
        console.error("Error checking username:", error);
        alert("닉네임 중복 확인에 실패했습니다.");
        clearNameInputField();
      }
    }
  };



  const handleCheckId = async () => {

    // 입력값이 비어 있는지 확인
    if (!user.userAccountId.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }

      try {
      const response = await axios.get(`/checkUserId/${user.userAccountId}`);
      
      if (response.status === 200) {
        alert("사용할 수 있는 아이디입니다.");
        setCheckedId("Y");
      } else {
        console.error("Unexpected status code:", response.status);
        clearInputField();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 존재하는 아이디입니다.");
        clearInputField(); // 아이디 입력 필드 비우기
      } else {
        console.error("Error checking username:", error);
        alert("아이디 중복 확인에 실패했습니다.");
        clearInputField();
      }
    }
  };

  const requiredFields = ["userAccountId", "userEmail", "password", "nickName"];

  const isFormValid = (fieldsToCheck) => {
    return fieldsToCheck.every((field) => user[field].trim() !== "");
  };


  

  const onSubmit = async (e) => {
    e.preventDefault(); 

    // 입력란이 비어 있는지 확인
    if (!isFormValid(requiredFields)) {
      alert("모든 입력란을 채워주세요.");
      return;
    }



    if (!termAgreement || !privacyAgreement) {
      alert("이용 약관 및 개인정보 수집 동의가 필요합니다.");
      return;
    }

    if (checkedId !== "Y" && checkedName !== "Y") {
      alert("아이디와 닉네임 중복 확인이 필요합니다.");
      return;
    } else if (checkedId !== "Y") {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    } else if (checkedName !== "Y") {
      alert("닉네임 중복 확인이 필요합니다.");
      return;
    }
  

    // survey 데이터가 배열이면 첫 번째 요소를 사용하고, 배열이 아니면 그대로 사용
    // const surveyData = Array.isArray(planData) ? planData[0] : planData;

    try {
      const signupResponse = await axios.post("/user/signup", user);
      console.log("Registration successful:", signupResponse);

      const loginResponse = await axios.post("/user/signin", {
        userAccountId: user.userAccountId,
        password: user.password,
      });

      // 로그인 성공 후 로컬 스토리지에 토큰 및 사용자 정보 저장
      const {
        accessToken,
        refreshToken,
        userAccountId,
        nickName,
        userId,
        adminYn,
      } = loginResponse.data;
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);

      localStorage.setItem("Authorization", accessToken);
      localStorage.setItem("Authorization-refresh", refreshToken);
      localStorage.setItem("userAccountId", userAccountId);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("userId", userId);
      localStorage.setItem("isAdmin", adminYn);
      localStorage.setItem("isLogin", true);

      // 로그인 성공 후 프로필 페이지로 이동
      navigate("/profile");
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
            <SoftBox mb={2} display="flex" alignItems="center">
              <SoftInput
                type="text"
                name="userAccountId"
                value={user.userAccountId}
                onChange={handleValueChange}
                placeholder="아이디"
              />

              <SoftButton onClick={handleCheckId} variant="text" color="dark">
                중복 확인
                <input type="hidden" name="checked_id" value={checkedId} />
              </SoftButton>
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
            <SoftBox mb={2} display="flex" alignItems="center">
              <SoftInput
                type="text"
                name="nickName"
                value={user.nickName}
                onChange={handleValueChange}
                placeholder="닉네임"
              />

               <SoftButton onClick={handleCheckName} variant="text" color="dark"  >
                중복 확인
                <input type="hidden" name="checked_name" value={checkedName} />
              </SoftButton>
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
                <Checkbox checked={termAgreement} onChange={handleSetTermAgreement} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetTermAgreement}
                  sx={{ cursor: "pointer", userSelect: "none" }}
                >
                  이용 약관 동의 (필수)
                </SoftTypography>
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Checkbox checked={privacyAgreement} onChange={handleSetPrivacyAgreement} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetPrivacyAgreement}
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
