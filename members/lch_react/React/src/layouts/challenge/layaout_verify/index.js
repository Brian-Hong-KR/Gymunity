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
    const { ch_id } = useParams(); // URL에서 챌린지 ID를 가져옵니다.
    const [upload1, setFile1] = useState(null);
    const [upload2, setFile2] = useState(null);
  
    const handleFile1Change = (e) => {
      setFile1(e.target.files[0]);
    };
  
    const handleFile2Change = (e) => {
      setFile2(e.target.files[0]);
    };
  
    const handleVerifyUpload = async () => {
      if (!upload1 || !upload2 || !ch_id) {
        alert("챌린지 ID와 파일을 선택하세요.");
        return;
      }
  
      const formData = new FormData();
      formData.append("chId", ch_id); // 챌린지 ID를 FormData에 추가합니다.
      formData.append("file", upload1); // 파일을 FormData에 추가합니다.
      formData.append("file", upload2); // 파일을 FormData에 추가합니다.
      console.log(formData)
      try {
        const response = await axios.post("/verify/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("Authorization")}`,
            "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
          },
        });
        console.log("File upload successful:", response.data);
        alert("파일 업로드 성공!");
      } catch (error) {
       
        console.error("File upload failed:", error);
        alert("파일 업로드 실패!");
      }
    };
  

  return (
    <div>
      <input type="file" onChange={handleFile1Change} />
      <input type="file" onChange={handleFile2Change} />
      <button onClick={handleVerifyUpload}>업로드</button>
    </div>
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


  
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div style={{ marginBottom: "30px" }}></div>{" "}
//       {/* 헤더와 카드 사이 간격 조정 */}
//       <Card style={{ textAlign: "center" }} >
//         <SoftBox mb={2} style={{ width: "400px", margin: "0 auto" }}>
//           <SoftBox mb={1} ml={1.5}>
//             <SoftTypography
//               component="label"
//               variant="caption"
//               fontWeight="bold"
//               value = {verify.upload1}
//               onChange ={handleFileChange}
//             >
//               첫 번째 인증사진을 등록하세요.
//             </SoftTypography>
//           </SoftBox>
//           <SoftInput type="file" placeholder="파일 선택" />
//         </SoftBox>

//         <SoftBox mb={2} style={{ width: "400px", margin: "0 auto" }}>
//           <SoftBox mb={1} ml={1.5}>
//             <SoftTypography
//               component="label"
//               variant="caption"
//               fontWeight="bold"
//               value = {verify.upload2}
//               onChange={(e) => handleFileChange(e, "upload2")}
//             >
//               두 번째 인증사진을 등록하세요.
//             </SoftTypography>
//           </SoftBox>
//           <SoftInput type="file" placeholder="파일 선택" />
//         </SoftBox>

//         <SoftBox mt={4} mb={1}>
//           <SoftButton
//             type = "submit" 
//             variant="gradient"
//             color="info"
//             fullWidth
//             onSubmit={handleVerify}
//           >
//             인증하기
//           </SoftButton>
//           {showAlert && (
//             <SoftBox
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <SoftAlert color="success" dismissible onClose={handleAlertClose}>
//                 인증이 완료되었습니다.
//               </SoftAlert>
//             </SoftBox>
//           )}
//         </SoftBox>
//       </Card>
//     </DashboardLayout>
//   );
// }


// export default ChallengeVerify;
