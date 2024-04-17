// import { useEffect, useState } from "react";

// // react-router-dom components
// import { Link, useNavigate } from "react-router-dom";

// // @mui material components
// import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import SoftInput from "components/SoftInput";
// import SoftButton from "components/SoftButton";

// // Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// // Images
// import curved6 from "assets/images/youn/digdas.jpg";
// import breakpoints from "assets/theme/base/breakpoints";

// function Survey() {
//   const [agreement, setAgremment] = useState(true);

//   const handleSetAgremment = () => setAgremment(!agreement);

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     gender: "female",
//     age: "young",
//     goal: "Overall health improvement",
//     level: "Intermediate",
//     abnormal: "no health problems",
//   });

//   // 서버로부터 받은 계획 데이터를 저장하기 위한 상태
//   const [planData, setPlanData] = useState({
//     planName: "",
//     planDesc: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitting", formData);

//     try {
//       const response = await axios.post("survey", formData);
//       console.log("Response data:", response.data);
//       setPlanData({
//         planName: response.data.planName,
//         planDesc: response.data.planDesc,
//       });

//       // Plan 페이지로 이동
//       navigate("/plan", { state: { planData: response.data } });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const [tabsOrientation, setTabsOrientation] = useState("horizontal");
//   const [tabValue, setTabValue] = useState(0);

//   useEffect(() => {
//     // A function that sets the orientation state of the tabs.
//     function handleTabsOrientation() {
//       return window.innerWidth < breakpoints.values.sm
//         ? setTabsOrientation("vertical")
//         : setTabsOrientation("horizontal");
//     }

//     /**
//      The event listener that's calling the handleTabsOrientation function when resizing the window.
//     */
//     window.addEventListener("resize", handleTabsOrientation);

//     // Call the handleTabsOrientation function to set the state with the initial value.
//     handleTabsOrientation();

//     // Remove event listener on cleanup
//     return () => window.removeEventListener("resize", handleTabsOrientation);
//   }, [tabsOrientation]);

//   const handleSetTabValue = (event, newValue) => setTabValue(newValue);

//   return (
//     <BasicLayout
//       title="설문조사!"
//       description="설문조사설국열차"
//       image={curved6}
//     >
//       <Card>
//         <SoftBox pt={2} pb={3} px={3}>
//           <SoftBox component="form" role="form">
//             <AppBar position="static">
//               <SoftBox p={3} mb={1} textAlign="center">
//                 <SoftTypography variant="h5" fontWeight="medium">
//                   1. 당신의 성별은?
//                 </SoftTypography>
//               </SoftBox>
//               <Tabs
//                 orientation={tabsOrientation}
//                 value={tabValue}
//                 onChange={handleSetTabValue}
//                 sx={{ background: "transparent" }}
//               >
//                 <Tab label="남자" />
//                 <Tab label="여자" />
//               </Tabs>
//               <SoftBox p={3} mb={1} textAlign="center">
//                 <SoftTypography variant="h5" fontWeight="medium">
//                   2. 당신의 연령대는?
//                 </SoftTypography>
//               </SoftBox>
//               <Tabs
//                 orientation={tabsOrientation}
//                 value={tabValue}
//                 onChange={handleSetTabValue}
//                 sx={{ background: "transparent" }}
//               >
//                 <Tab label="App" />
//                 <Tab label="Message" />
//                 <Tab label="Settings" />
//               </Tabs>
//               <SoftBox p={3} mb={1} textAlign="center">
//                 <SoftTypography variant="h5" fontWeight="medium">
//                   3. 당신의 운동 목표는?
//                 </SoftTypography>
//               </SoftBox>
//               <Tabs
//                 orientation={tabsOrientation}
//                 value={tabValue}
//                 onChange={handleSetTabValue}
//                 sx={{ background: "transparent" }}
//               >
//                 <Tab label="App" />
//                 <Tab label="Message" />
//                 <Tab label="Settings" />
//               </Tabs>
//               <SoftBox p={3} mb={1} textAlign="center">
//                 <SoftTypography variant="h5" fontWeight="medium">
//                   4. 당신의 운동 수준은?
//                 </SoftTypography>
//               </SoftBox>
//               <Tabs
//                 orientation={tabsOrientation}
//                 value={tabValue}
//                 onChange={handleSetTabValue}
//                 sx={{ background: "transparent" }}
//               >
//                 <Tab label="App" />
//                 <Tab label="Message" />
//                 <Tab label="Settings" />
//               </Tabs>
//               <SoftBox p={3} mb={1} textAlign="center">
//                 <SoftTypography variant="h5" fontWeight="medium">
//                   5. 운동 시 주의가 필요한 건강 이상은?
//                 </SoftTypography>
//               </SoftBox>
//               <Tabs
//                 orientation={tabsOrientation}
//                 value={tabValue}
//                 onChange={handleSetTabValue}
//                 sx={{ background: "transparent" }}
//               >
//                 <Tab label="App" />
//                 <Tab label="Message" />
//                 <Tab label="Settings" />
//               </Tabs>
//             </AppBar>
//           </SoftBox>
//         </SoftBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default Survey;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // @mui material components
// import Card from "@mui/material/Card";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import AppBar from "@mui/material/AppBar";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import SoftButton from "components/SoftButton";

// // Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// // Images
// import curved6 from "assets/images/youn/digdas.jpg";

// function Survey() {
//   const navigate = useNavigate();
//   const [tabValue, setTabValue] = useState(0);

//   const [formData, setFormData] = useState({
//     gender: "female",
//     age: "young",
//     goal: "Overall health improvement",
//     level: "Intermediate",
//     abnormal: "no health problems",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/survey", formData);
//       navigate("/plan", { state: { planData: response.data } });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleSetTabValue = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <BasicLayout
//       image={curved6}
//       title="Join Our Community"
//       description="Fill out the form to get started!"
//     >
//       <Card>
//         <SoftBox
//           component="form"
//           role="form"
//           onSubmit={handleSubmit}
//           pt={2}
//           pb={3}
//           px={3}
//         >
//           <AppBar position="static">
//             <Tabs
//               orientation="horizontal"
//               value={tabValue}
//               onChange={handleSetTabValue}
//               sx={{ background: "transparent" }}
//             >
//               <Tab label="성별" />
//               <Tab label="연령대" />
//               <Tab label="운동 목표" />
//               <Tab label="운동 수준" />
//               <Tab label="건강 이상" />
//             </Tabs>
//           </AppBar>
//           {tabValue === 0 && (
//             // 성별
//             <SoftBox p={3}>{/* 성별 입력 컴포넌트 */}</SoftBox>
//           )}
//           {tabValue === 1 && (
//             // 연령대
//             <SoftBox p={3}>{/* 연령대 입력 컴포넌트 */}</SoftBox>
//           )}
//           {tabValue === 2 && (
//             // 운동 목표
//             <SoftBox p={3}>{/* 운동 목표 입력 컴포넌트 */}</SoftBox>
//           )}
//           {tabValue === 3 && (
//             // 운동 수준
//             <SoftBox p={3}>{/* 운동 수준 입력 컴포넌트 */}</SoftBox>
//           )}
//           {tabValue === 4 && (
//             // 건강 이상
//             <SoftBox p={3}>{/* 건강 이상 입력 컴포넌트 */}</SoftBox>
//           )}
//           <SoftButton type="submit">Submit</SoftButton>
//         </SoftBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default Survey;

// import React, { useState } from "react";
// import {
//   Card,
//   AppBar,
//   Tabs,
//   Tab,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import SoftBox from "components/SoftBox";
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import backimage from "assets/images/youn/digdas.jpg";
// import SoftTypography from "components/SoftTypography";
// import SoftButton from "components/SoftButton";
// import axios from "axios";

// function Survey() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     gender: "female",
//     age: "young",
//     goal: "Overall health improvement",
//     level: "Intermediate",
//     abnormal: [], //Initialize as an empty array
//   });

//   const [planData, setPlanData] = useState({
//     planName: "",
//     planDesc: "",
//   });

//   // Tab 저장
//   const [genderTabValue, setGenderTabValue] = useState(0);
//   const [ageTabValue, setAgeTabValue] = useState(0);
//   const [goalTabValue, setGoalTabValue] = useState(0);
//   const [levelTabValue, setLevelTabValue] = useState(0);

//   // 성별
//   const handleGenderTabChange = (event, newValue) => {
//     const newGender = newValue === 0 ? "male" : "female";
//     setGenderTabValue(newValue);
//     setFormData({ ...formData, gender: newGender });
//   };

//   // 나이
//   const handleAgeTabChange = (event, newValue) => {
//     const newAge = newValue === 0 ? "young" : "old";
//     setAgeTabValue(newValue);
//     setFormData({ ...formData, age: newAge });
//   };

//   // 운동목표
//   const handleGoalTabChange = (event, newValue) => {
//     // 목표에 따른 레이블을 객체로 매핑
//     const goalOptions = {
//       0: "Body fat reduction",
//       1: "Muscle gain",
//       2: "Overall health improvement",
//     };
//     // newValue를 사용하여 해당 목표를 찾음
//     const newGoal = goalOptions[newValue];
//     // 상태 업데이트
//     setGoalTabValue(newValue); // 이 변수의 이름이 목적에 맞게 설정되었는지 확인하세요
//     setFormData((prev) => ({
//       ...prev,
//       goal: newGoal,
//     }));
//   };

//   // 운동수준
//   const handleLevelTabChange = (event, newValue) => {
//     // 목표에 따른 레이블을 객체로 매핑
//     const levelOptions = {
//       0: "beginner",
//       1: "Intermediate",
//       2: "advanced",
//     };
//     // newValue를 사용하여 해당 목표를 찾음
//     const newLevel = levelOptions[newValue];
//     // 상태 업데이트
//     setLevelTabValue(newValue); // 이 변수의 이름이 목적에 맞게 설정되었는지 확인하세요
//     setFormData((prev) => ({
//       ...prev,
//       level: newLevel,
//     }));
//   };

//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;

//     // "없음" 선택시 다른 모든 선택 해제
//     if (value === "no health problems") {
//       if (checked) {
//         setFormData({ ...formData, abnormal: [value] });
//       } else {
//         setFormData({ ...formData, abnormal: [] });
//       }
//     } else {
//       if (checked) {
//         // "없음"이 이미 선택되어 있으면 제거
//         const newAbnormal = formData.abnormal.filter(
//           (item) => item !== "no health problems"
//         );
//         setFormData({ ...formData, abnormal: [...newAbnormal, value] });
//       } else {
//         const newAbnormal = formData.abnormal.filter((item) => item !== value);
//         setFormData({ ...formData, abnormal: newAbnormal });
//       }
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { value, checked } = e.target;

//   //   if (value === "no health problems") {
//   //     // "없음"이 체크되면 다른 모든 항목을 해제
//   //     setFormData((prevFormData) => ({
//   //       ...prevFormData,
//   //       abnormal: checked ? ["no health problems"] : [],
//   //     }));
//   //   } else {
//   //     // 다른 항목이 체크되면 "없음"을 해제
//   //     setFormData((prevFormData) => ({
//   //       ...prevFormData,
//   //       abnormal: checked
//   //         ? prevFormData.abnormal.includes("no health problems")
//   //           ? [value]
//   //           : [...prevFormData.abnormal, value]
//   //         : prevFormData.abnormal.filter((item) => item !== value),
//   //     }));
//   //   }
//   // };

//   // 건강이상
//   // const handleAbnormalTabChange = (event, newValue) => {
//   //   const newAge = newValue === 0 ? "young" : "old";
//   //   setAgeTabValue(newValue);
//   //   setFormData({ ...formData, age: newAge });
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitting", formData);

//     // formData를 로컬 스토리지에 저장
//     // localStorage.setItem("gender", formData.gender);
//     // localStorage.setItem("age", formData.age);
//     // localStorage.setItem("goal", formData.goal);
//     // localStorage.setItem("level", formData.level);
//     // localStorage.setItem("abnormal", formData.abnormal);

//     try {
//       const response = await axios.post("/survey", formData);
//       console.log("Response data:", response.data);
//       setPlanData({
//         planName: response.data.planName,
//         planDesc: response.data.planDesc,
//       });

//       // Plan 페이지로 이동
//       navigate("/authentication/plan", { state: { planData: response.data } });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <BasicLayout
//       image={backimage}
//       title="설문조사"
//       description="설국열차설구경차"
//     >
//       <Card>
//         <SoftBox
//           component="form"
//           role="form"
//           onSubmit={handleSubmit}
//           pt={2}
//           pb={3}
//           px={3}
//         >
//           <AppBar position="static">
//             <SoftBox p={3} mb={1} textAlign="center">
//               <SoftTypography variant="h5" fontWeight="medium">
//                 1. 당신의 성별은?
//               </SoftTypography>
//             </SoftBox>
//             <Tabs
//               value={genderTabValue}
//               onChange={handleGenderTabChange}
//               indicatorColor="primary"
//               textColor="primary"
//               centered
//             >
//               <Tab label="남자" />
//               <Tab label="여자" />
//             </Tabs>
//             <SoftBox p={3} mb={1} textAlign="center">
//               <SoftTypography variant="h5" fontWeight="medium">
//                 2. 당신의 연령대는?
//               </SoftTypography>
//             </SoftBox>
//             <Tabs
//               value={ageTabValue}
//               onChange={handleAgeTabChange}
//               indicatorColor="primary"
//               textColor="primary"
//               centered
//             >
//               <Tab label="35세 이하" />
//               <Tab label="36세 이상" />
//             </Tabs>
//             <SoftBox p={3} mb={1} textAlign="center">
//               <SoftTypography variant="h5" fontWeight="medium">
//                 3. 당신의 운동 목표는?
//               </SoftTypography>
//             </SoftBox>
//             <Tabs
//               value={goalTabValue}
//               onChange={handleGoalTabChange}
//               indicatorColor="primary"
//               textColor="primary"
//               centered
//             >
//               <Tab label="체지방량 감소" />
//               <Tab label="근육량 증가" />
//               <Tab label="종합 건강" />
//             </Tabs>
//             <SoftBox p={3} mb={1} textAlign="center">
//               <SoftTypography variant="h5" fontWeight="medium">
//                 4. 당신의 운동 수준은?
//               </SoftTypography>
//             </SoftBox>
//             <Tabs
//               value={levelTabValue}
//               onChange={handleLevelTabChange}
//               indicatorColor="primary"
//               textColor="primary"
//               centered
//             >
//               <Tab label="입문" />
//               <Tab label="중급" />
//               <Tab label="전문가" />
//             </Tabs>
//             <SoftBox p={3} mb={1} textAlign="center">
//               <SoftTypography variant="h5" fontWeight="medium">
//                 5. 운동 시 주의가 필요한 건강 이상은?
//               </SoftTypography>
//             </SoftBox>
//             <Box sx={{ p: 3 }}>
//               <FormGroup row>
//                 {[
//                   "cardiovascular disease",
//                   "musculoskeletal disorders",
//                   "respiratory diseases",
//                   "no health problems",
//                 ].map((item, index) => (
//                   <FormControlLabel
//                     key={index}
//                     control={
//                       <Checkbox
//                         checked={formData.abnormal.includes(item)}
//                         onChange={handleCheckboxChange}
//                         value={item}
//                       />
//                     }
//                     label={item}
//                   />
//                 ))}
//               </FormGroup>
//             </Box>
//           </AppBar>
//           <SoftBox mt={4} mb={1}>
//             <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
//               맞춤 플랜 생성
//             </SoftButton>
//           </SoftBox>
//         </SoftBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default Survey;
