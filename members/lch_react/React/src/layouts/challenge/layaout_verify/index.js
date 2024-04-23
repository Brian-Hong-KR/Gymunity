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

import { useParams } from "react-router-dom";
import axios from "axios";

// Overview page components


  function ChallengeVerify() {
    const { ch_id } = useParams();
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const showAlert = (message) => {
      alert(message);
    };
  
    const handleUpload = async (event) => {
      event.preventDefault();
      
     if(file == null ){
      alert('인증 사진을 등록하세요.')
      return;
     }
  
      const formData = new FormData();
      formData.append('chId', ch_id); // chId를 FormData에 추가
      formData.append('file', file);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('Authorization'),
          'Authorization-refresh': localStorage.getItem('Authorization-refresh'),
        },
      };
  
      try {
        const response = await axios.post('/verify/upload', formData, config);
        console.log(response.data);
        
        alert('사진이 성공적으로 업로드되었습니다.');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);
      } catch (error) {
      
        if (error.response.data && error.response.status === 400) {
          setErrorMessage('오늘 인증을 모두 하셨습니다.');
          console.error(error);
          console.log('오류 응답:', error.response);
console.log('오류 상태:', error.response.status);
console.log('오류 데이터:', error.response.data);
        }  else {
          setErrorMessage('사진 업로드 중 오류가 발생했습니다.');
        }
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    };

     
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ marginBottom: "30px" }}></div>{" "}
      {/* 헤더와 카드 사이 간격 조정 */}
      <Card style={{ textAlign: "center" }} >
        <SoftBox mb={2} style={{ width: "400px", margin: "0 auto" }}>
          <SoftBox mb={1} ml={1.5}>
            <SoftTypography
              component="label"
             
            >
              첫 번째 인증사진을 등록하세요.
            </SoftTypography>
          </SoftBox>
          <SoftInput input type="file"  
              accept="image/*"
              onChange={handleFileChange}
              placeholder="파일 선택" />
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
          <SoftInput  input type="file"   accept="image/*"  placeholder="파일 선택"  onChange={handleFileChange} />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton
            type = "submit" 
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
          <SoftAlert color="success">
            {successMessage}
          </SoftAlert>
        </SoftBox>
      )}  {errorMessage && (
        <SoftBox
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SoftAlert color="error">
            {errorMessage}
          </SoftAlert>
             
            </SoftBox>
          )}
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}




export default ChallengeVerify;
// function ChallengeVerify() {
//   const { ch_id } = useParams();
//   const [verify, setVerify] = useState({
//     upload1:"",
//     upload2:"",
//   });

//   const [upload1, setUpload1] = useState(null); // 첫 번째 인증사진 파일 상태
//   const [upload2, setUpload2] = useState(null); // 두 번째 인증사진 파일 상태
//   const [showAlert, setShowAlert] = useState(false); // SoftAlert의 표시 여부를 관리할 상태

//   // // SoftButton 클릭 시 SoftAlert을 보여주는 함수
//   // const handleVerifyButtonClick = () => {
//   //   setShowAlert(true); // showAlert 상태를 true로 변경하여 SoftAlert을 보이도록 설정
//   // };

//   // SoftAlert의 닫기 버튼 클릭 시 SoftAlert을 닫는 함수
//   const handleAlertClose = () => {
//     setShowAlert(false); // showAlert 상태를 false로 변경하여 SoftAlert을 숨기도록 설정
//   };

//   const handleFileChange = (e, name) => {
//     // 파일 선택 시 상태 업데이트
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       if (name === "upload1") {
//         setUpload1({...verify, upload1 : file});
//       } else if (name === "upload2") {
//         setUpload2({...verify, upload2 : file});
//       }
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("upload1", upload1);
//       formData.append("upload2", upload2);

//       const response = await axios.post("/verify/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `${localStorage.getItem("Authorization")}`,
//           "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
//         },
//       });

//       console.log("Verification successful:", response.data);
//       alert("인증이 성공적으로 되었습니다.");
//     } catch (error) {
//       console.error("Verification failed:", error);
//       alert("인증에 실패했습니다.");
//     }
//   };


 


// export default ChallengeVerify;
