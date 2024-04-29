import React from "react";
import { useNavigate } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthNavbar from "examples/Navbars/AuthNavbar";
import axios from "axios";
import { gConst } from 'layouts/gConst';

const MainPage = () => {
  const navigate = useNavigate();

  const handleSurveySubmit = async () => {
    try {
      const response = await axios.post(`${gConst.API_BASE_URL}:8090/submissions`);
      navigate("/authentication/survey");
    } catch (error) {}
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
        <SoftTypography variant="h3">Gymunity 란?</SoftTypography>
      </SoftBox>

      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            운동을 뜻하는 Gym 과 공동체를 뜻하는 Community 를 합친 단어로
            홈트레이닝을 배울 뿐만 아니라, 다른 사람들과 교류하며 지속적인 동기
            부여를 장려하는 서비스 입니다.
            <br />
            <br />
          </SoftTypography>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            1. 설문조사를 기반으로 당신에게 적합한 운동 프로그램을 설계하고,
            가이드 영상을 찾아주며, 운동 중 궁금한 사항을 퍼스널 트레이너
            인공지능에게 물어보실 수 있습니다. <br /> 매일 운동 완료 보상을
            쌓아보세요. <br />
            <br />
          </SoftTypography>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            2. 챌린지를 통해 다른 사람들과 같은 목표로 함께 운동해요. <br />{" "}
            성공률에 따라 추가 보상이 지급됩니다.
            <br /> <br />{" "}
          </SoftTypography>
          <SoftBox mt={4} mb={1}>
            <SoftButton
              onClick={handleSurveySubmit}
              type="button"
              variant="gradient"
              color="dark"
              fullWidth
            >
              설문 시작 하기
            </SoftButton>
          </SoftBox>

          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
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
      </Card>
    </BasicLayout>
  );
};

export default MainPage;
