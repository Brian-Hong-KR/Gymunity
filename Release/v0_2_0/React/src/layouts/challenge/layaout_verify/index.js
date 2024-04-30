import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftAlert from "components/SoftAlert";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Images
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";

// Overview page components

import { useParams } from "react-router-dom";
import axios from "axios";
import { gConst } from "layouts/gConst";

// Overview page components

function ChallengeVerify() {
  const { ch_id } = useParams();
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (file == null) {
      alert("인증 사진을 등록하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("chId", ch_id); // chId를 FormData에 추가
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
        "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
      },
    };

   
    try {
      const response = await axios.post(
        `${gConst.API_BASE_URL}:8090/verify/upload`,
        formData,
        config
      );

      alert("사진이 성공적으로 업로드되었습니다.");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      if (error.response.data && error.response.status === 400) {
        setErrorMessage("오늘 인증을 모두 하셨습니다.");
      } else {
        setErrorMessage("사진 업로드 중 오류가 발생했습니다.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox my={2} textAlign="center">
        <SoftTypography variant="h4" fontWeight="bold">
          챌린지 인증
        </SoftTypography>
    </SoftBox>


     
      <Card style={{ textAlign: "center" }}>
        <SoftBox p={6} mb={2} style={{ width: "400px", margin: "0 auto" }}>
          <SoftBox mb={1} ml={1.5}>
            <SoftTypography component="label">
             인증사진을 등록하세요.
            </SoftTypography>
          </SoftBox>
          <SoftInput
            input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            placeholder="파일 선택"
            style={{ marginTop: "8px" }}
          />
        </SoftBox>

        <SoftBox mt={1} mb={1}>
          <SoftButton
            type="submit"
            variant="gradient"
            color="dark"
            style={{ fontSize: '15px' }} 
            fullWidth
            onClick={handleUpload}
          >
            인증하기
          </SoftButton>
          {successMessage && (
            <SoftBox
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SoftAlert color="success">{successMessage}</SoftAlert>
            </SoftBox>
          )}{" "}
          {errorMessage && (
            <SoftBox
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SoftAlert color="error">{errorMessage}</SoftAlert>
            </SoftBox>
          )}
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}

export default ChallengeVerify;
