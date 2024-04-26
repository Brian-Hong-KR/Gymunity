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
      const response = await axios.post("/verify/upload", formData, config);
      console.log(response.data);

      alert("사진이 성공적으로 업로드되었습니다.");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      if (error.response.data && error.response.status === 400) {
        setErrorMessage("오늘 인증을 모두 하셨습니다.");
        console.error(error);
        console.log("오류 응답:", error.response);
        console.log("오류 상태:", error.response.status);
        console.log("오류 데이터:", error.response.data);
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
      <div style={{ marginBottom: "30px" }}></div>{" "}
      {/* 헤더와 카드 사이 간격 조정 */}
      <Card style={{ textAlign: "center" }}>
        <SoftBox mb={2} style={{ width: "400px", margin: "0 auto" }}>
          <SoftBox mb={1} ml={1.5}>
            <SoftTypography component="label">
              첫 번째 인증사진을 등록하세요.
            </SoftTypography>
          </SoftBox>
          <SoftInput
            input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            placeholder="파일 선택"
          />
        </SoftBox>

        <SoftBox mb={2} style={{ width: "400px", margin: "0 auto" }}>
          <SoftBox mb={1} ml={1.5}>
            <SoftTypography
              component="label"
              accept="image/*"
              onChange={handleFileChange}
            >
              두 번째 인증사진을 등록하세요.
            </SoftTypography>
          </SoftBox>
          <SoftInput
            input
            type="file"
            accept="image/*"
            placeholder="파일 선택"
            onChange={handleFileChange}
          />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton
            type="submit"
            variant="gradient"
            color="info"
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
