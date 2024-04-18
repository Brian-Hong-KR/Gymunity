// react-router-dom components
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "./../components/Header/index";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import axios from 'axios';

function ChallengeCreate() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  // const formData = Array.isArray(location.state?.formData)
  // ? location.state.formData[0]
  // : location.state?.formData;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [challenge, setChallenge] = useState({
    title: "",
    content: "",
    category: 0,
    bettingPoint: 0,
    chStartDate: "",
    chEndDate: "",
  });


  // useEffect(() => {
  //   // A function that sets the orientation state of the tabs.
  //   function handleTabsOrientation() {
  //     return window.innerWidth < breakpoints.values.sm
  //       ? setTabsOrientation("vertical")
  //       : setTabsOrientation("horizontal");
  //   }
  //   window.addEventListener("resize", handleTabsOrientation);

  //   handleTabsOrientation();

  //   return () => window.removeEventListener("resize", handleTabsOrientation);
  // }, [tabsOrientation]);



  // 탭 
  
  const handleSetTabValue1 = (event, newValue) => setTabValue1(newValue);


  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [CategoryTabValue, setCategoryTabValue] = useState(0);
  const [tabValue1, setTabValue1] = useState(0);
  const [tabValue2, setTabValue2] = useState(0);
 
  const [errorMessage, setErrorMessage] = useState('');

 // 배팅 포인트
const [bettingPoint, setBettingPoint] = useState(0);

// 카테고리
const handleSetTabValue = (event, newValue) => {
  setCategoryTabValue(newValue);

  const categortOptions = {
    0: 1,
    1: 2,
    2: 3
  };
  const newCategory = categortOptions[newValue];
  setCategoryTabValue(newValue);
  setChallenge((prev) => ({
    ...prev,
    category: newCategory,
  }));
  console.log("카테고리 값:", newCategory);
};

// 챌린지 기간
const handleSetTabValue2 = (event, newValue) => {
  setTabValue2(newValue);

  const dateOptions = {
    0: 1,
    1: 2,
    2: 4,
    3: 8
  };

  const periodInWeeks = dateOptions[newValue];

  if (!challenge.chStartDate) {
    console.error('챌린지 시작일이 비어있습니다. 기본값으로 현재 날짜를 설정합니다.');
    const today = new Date();
    setChallenge({ ...challenge, chStartDate: today.toISOString().split('T')[0] });
    return;
  }
  const startDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!startDateRegex.test(challenge.chStartDate)) {
    console.error('챌린지 시작일이 올바른 형식이 아닙니다.');
    return;
  }
  
  const startDate = challenge.chStartDate ? new Date(challenge.chStartDate) : new Date();

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + periodInWeeks * 7);

  setChallenge((prev) => ({
    ...prev,
    chEndDate: endDate.toISOString().split('T')[0]
  }));

  console.log("계산된 종료일:", endDate.toISOString().split('T')[0]);

};

// 이벤트
const handleChangeDate = (event) => {
  const input = event.target.value;

  // 입력값이 숫자로만 이루어져 있는지 확인 (정규식)
  const numberRegex = /^[0-9]*$/;

  // 챌린지 시작일 업데이트
  setChallenge({ ...challenge, chStartDate: input });
};

// 시작일 안 지워져서 하는거임
const handleKeyDown = (event) => {
  // Backspace 키를 눌렀을 때 '-' 문자를 삭제합니다
  if (event.key === 'Backspace') {
    const input = event.target.value;
    if (input[input.length - 1] === '-') {
      setDate(input.slice(0, input.length - 1));
    }
  }
};

const handleValueChange = (event) => {
  const { name, value } = event.target;
  // name이 'bettingPoint' 또는 'category'일 때는 value를 정수형으로 변환하여 상태에 설정
  // 그렇지 않은 경우에는 문자열 그대로 설정
  setChallenge((prev) => ({
    ...prev,
    [name]: (name === 'bettingPoint' || name === 'category') ? (parseInt(value) || "") : value
  }));
};

const handleCreateChallenge  = async (e) =>  {
  // const { title, content, bettingPoint } = challenge;
  
  // if (!title.trim() || !content.trim() || bettingPoint === 0) {
  //   setErrorMessage('빈 입력란을 작성해주세요.');
  //   return;
  // }
  // const bettingPointValue = parseInt(bettingPoint);

  //  if (bettingPointValue <= 199) {
  //   // bettingPoint가 200보다 작거나 같은 경우
  //   alert('배팅 포인트를 200 이상으로 작성하세요.');
  //   setBettingPoint(0); // 배팅 포인트 리셋
  //   return;
  // } else {
  //   e.preventDefault();
    
  //   // 챌린지 생성 로직
  //   try {
  //     const response = await axios.post("/challenges/create", challenge);
  //     console.log("Response data:", response.data);
  //     //history.push("/challenges/list/1");
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  e.preventDefault();

  console.log("Form submitting", challenge);
  try {
    const response = await axios.post("/challenges/create", challenge);
    console.log("Registration successful:", response);
    navigate("/dashboard"); // 회원가입 후 메인 페이지로 이동
  } catch (error) {
    console.error("Registration failed:", error);
  }

};



  return (
    <DashboardLayout>
     <DashboardNavbar/>

      <CoverLayout
        title="챌린지 만들기"
        description="건전하고 공정한 챌린지로 모두 즐겁게 운동할 수 있게 해주세요."
        image={curved9}
      >

        <SoftBox component="form" role="form" onSubmit={handleCreateChallenge}> 

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                챌린지 제목
              </SoftTypography>
            </SoftBox>
            <SoftInput type="title" 
            placeholder="챌린지 제목" 
            name = "title"
            value = {challenge.title}
            onChange={handleValueChange}/>
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                챌린지 유형
              </SoftTypography>
            </SoftBox>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={CategoryTabValue}
                  onChange={handleSetTabValue}
                  sx={{ background: "transparent" }}
                >
                  <Tab label="체중 감소" icon={<Cube />} />
                  <Tab label="근력 향상" icon={<Document />} />
                  <Tab label="종합 건강 증진" icon={<Settings />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          {/* <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                인증 빈도
              </SoftTypography>
            </SoftBox>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue1}
                  onChange={handleSetTabValue1}
                  sx={{ background: "transparent" }}
                >
                  <Tab label="매일" icon={<Cube />} />
                  <Tab label="평일" icon={<Document />} />
                  <Tab label="주말" icon={<Settings />} />
                  <Tab label="주 1일" icon={<Settings />} />
                  <Tab label="주 2일" icon={<Settings />} />
                  <Tab label="주 3일" icon={<Settings />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox> */}

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                챌린지 기간
              </SoftTypography>
            </SoftBox>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue2}
                  onChange={handleSetTabValue2}
                  sx={{ background: "transparent" }}
                >
                  <Tab label="1주간" icon={<Cube />} />
                  <Tab label="2주간" icon={<Cube />} />
                  <Tab label="4주간" icon={<Document />} />
                  <Tab label="8주간" icon={<Settings />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                챌린지 시작일
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              name = "chStartDate"
              value={challenge.chStartDate}
              placeholder="yyyy-mm-dd"
              onChange={handleChangeDate}
              onKeyDown={handleKeyDown}
            />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                챌린지 소개
              </SoftTypography>
            </SoftBox>
            <SoftInput type="title" 
                       name = "content"
                       placeholder="챌린지 소개"
                       value = {challenge.content} 
                       onChange={handleValueChange}/>
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                배팅 포인트
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="number"
              name = "bettingPoint"
              placeholder="배팅 포인트"
              value={challenge.bettingPoint}
              onChange={handleValueChange}
            />
          </SoftBox>
          
          {errorMessage && <p>{errorMessage}</p>}
          <SoftBox mt={4} mb={1}>
            <SoftButton type = "submit" 
                        variant="gradient" 
                        color="info" 
                        fullWidth 
                        // onClick={handleCreateChallenge}>
                        >
              챌린지 만들기
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </CoverLayout>
    </DashboardLayout>
  );
}

export default ChallengeCreate;
