import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PrivacyPolicyContent from "../texts/PrivacyPolicy";
import TermsOfServiceContent from "../texts/TermsOfService";

function SignUp() {
  const [termAgreement, setTermAgreement] = useState(false);
  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // location.state.planData가 배열인지 확인하고, 배열이면 첫 번째 요소를 사용하고, 아니면 그대로 사용
  const formData = Array.isArray(location.state?.formData)
    ? location.state.formData[0]
    : location.state?.formData;

  const planData = location.state?.planData;

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

  const handleOpenTermsModal = () => setShowTermsModal(true);
  const handleCloseTermsModal = () => setShowTermsModal(false);
  const handleOpenPrivacyModal = () => setShowPrivacyModal(true);
  const handleClosePrivacyModal = () => setShowPrivacyModal(false);

  const handleSetTermAgreement = () => {
    setTermAgreement(!termAgreement);
    handleOpenTermsModal();
  };

  const handleSetPrivacyAgreement = () => {
    setPrivacyAgreement(!privacyAgreement);
    handleOpenPrivacyModal();
  };

  const clearInputField = () => {
    // 아이디 입력 필드를 비웁니다.
    setUser((prevUser) => ({ ...prevUser, userAccountId: "" }));
  };

  const handleCheckUsername = async () => {
    // 입력값이 비어 있는지 확인
    if (!user.userAccountId.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }

    try {
      const response = await axios.get(`/checkUsername/${user.userAccountId}`);

      if (response.status === 200) {
        alert("사용할 수 있는 아이디입니다.");
      } else {
        console.error("Unexpected status code:", response.status);
        showErrorAlert();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 존재하는 아이디입니다.");
        clearInputField(); // 아이디 입력 필드 비우기
      } else {
        console.error("Error checking username:", error);
        showErrorAlert();
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
      alert("You must agree to the terms and conditions.");
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
              <SoftButton
                onClick={handleCheckUsername}
                variant="text"
                color="dark"
              >
                중복 확인
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
            {/* <SoftBox display="flex" flexDirection="column">
              <SoftBox mb={1} display="flex" alignItems="center">
                <Checkbox
                  checked={termAgreement}
                  onChange={handleSetTermAgreement}
                />
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
                <Checkbox
                  checked={privacyAgreement}
                  onChange={handleSetPrivacyAgreement}
                />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetPrivacyAgreement}
                  sx={{ cursor: "pointer", userSelect: "none" }}
                >
                  개인정보 수집 및 이용 동의 (필수)
                </SoftTypography>
              </SoftBox>
            </SoftBox> */}
            <Card>
              <SoftBox pt={2} pb={3} px={3}>
                <SoftBox component="form" role="form" onSubmit={onSubmit}>
                  {/* Inputs and other UI elements... */}

                  <SoftBox display="flex" flexDirection="column">
                    <SoftBox mb={1} display="flex" alignItems="center">
                      <Checkbox
                        checked={termAgreement}
                        onChange={handleSetTermAgreement}
                      />
                      <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleOpenTermsModal}
                        sx={{ cursor: "pointer", userSelect: "none" }}
                      >
                        이용 약관 동의 (필수)
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center">
                      <Checkbox
                        checked={privacyAgreement}
                        onChange={handleSetPrivacyAgreement}
                      />
                      <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleOpenPrivacyModal}
                        sx={{ cursor: "pointer", userSelect: "none" }}
                      >
                        개인정보 수집 및 이용 동의 (필수)
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>

                  {/* Modal for Terms of Service */}
                  <Modal
                    open={showTermsModal}
                    onClose={handleCloseTermsModal}
                    aria-labelledby="terms-modal-title"
                    aria-describedby="terms-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        height: 500,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        overflowY: "auto",
                      }}
                    >
                      <Typography
                        id="terms-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        이용 약관
                      </Typography>
                      <TermsOfServiceContent />
                      <Button onClick={handleCloseTermsModal}>닫기</Button>
                    </Box>
                  </Modal>

                  {/* Modal for Privacy Policy */}
                  <Modal
                    open={showPrivacyModal}
                    onClose={handleClosePrivacyModal}
                    aria-labelledby="privacy-modal-title"
                    aria-describedby="privacy-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography
                        id="privacy-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        개인정보 수집 및 이용
                      </Typography>
                      <PrivacyPolicyContent />
                      <Button onClick={handleClosePrivacyModal}>닫기</Button>
                    </Box>
                  </Modal>
                </SoftBox>
              </SoftBox>
            </Card>
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
