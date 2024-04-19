// react-router-dom components
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

function ChallengeCreate() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [tabValue1, setTabValue1] = useState(0);
  const [tabValue2, setTabValue2] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  // 탭 
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const handleSetTabValue1 = (event, newValue) => setTabValue1(newValue);
  const handleSetTabValue2 = (event, newValue) => setTabValue2(newValue);

  // 배팅 포인트
  const [bettingPoint, setBettingPoint] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleCreateChallenge = () => {
    if (!title.trim() || !content.trim() || !bettingPoint.trim()) {
      setErrorMessage('빈 입력란을 작성해주세요.');
      return;
    }

    if (bettingPoint <= 199) {
      alert('배팅 포인트를 200 이상으로 작성하세요.');
      setBettingPoint(''); // 배팅 포인트 리셋
      return;
    } else {
      // 챌린지 생성 로직
    }
  };

  const handleChangeDate = (event) => {
    const input = event.target.value;
    // 입력된 값이 숫자인지 확인합니다
    const numericInput = input.replace(/\D/g, '');
    // 입력된 값이 4자리일 때는 'yyyy-' 형식으로, 6자리일 때는 'yyyy-mm-' 형식으로 자동으로 '-'가 추가됩니다
    if (numericInput.length === 4) {
      const formattedDate = `${numericInput}-`;
      setDate(formattedDate);
    } else if (numericInput.length === 5) {
      const year = numericInput.slice(0, 4);
      const month = numericInput.slice(4, 5);
      const formattedDate = `${year}-${month || ''}`;
      setDate(formattedDate);
    } else if (numericInput.length >= 6) {
      const year = numericInput.slice(0, 4);
      const month = numericInput.slice(4, 6);
      const day = numericInput.slice(6, 8);
      const formattedDate = `${year}-${month || ''}-${day || ''}`;
      setDate(formattedDate);
    } else {
      setDate(numericInput);
    }
  };

  const handleKeyDown = (event) => {
    // Backspace 키를 눌렀을 때 '-' 문자를 삭제합니다
    if (event.key === 'Backspace') {
      const input = event.target.value;
      if (input[input.length - 1] === '-') {
        setDate(input.slice(0, input.length - 1));
      }
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    setErrorMessage('');
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
    setErrorMessage('');
  };

  const handleChangeBettingPoint = (event) => {
    setBettingPoint(event.target.value);
    setErrorMessage('');
  };

  return (
    <DashboardLayout>
     <DashboardNavbar/>

      <CoverLayout
        title="챌린지 만들기"
        description="건전하고 공정한 챌린지로 모두 즐겁게 운동할 수 있게 해주세요."
        image={curved9}
      >
        <SoftBox component="form" role="form">
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                챌린지 제목
              </SoftTypography>
            </SoftBox>
            <SoftInput type="title" placeholder="챌린지 제목" onChange={handleChangeTitle} />
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
                  value={tabValue}
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

          <SoftBox mb={2}>
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
          </SoftBox>

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
              value={date}
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
            <SoftInput type="title" placeholder="챌린지 소개" onChange={handleChangeContent} />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                배팅 포인트
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              placeholder="배팅 포인트"
              value={bettingPoint}
              onChange={handleChangeBettingPoint}
            />
          </SoftBox>

          {errorMessage && <p>{errorMessage}</p>}
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" fullWidth onClick={handleCreateChallenge}>
              챌린지 만들기
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </CoverLayout>
    </DashboardLayout>
  );
}

export default ChallengeCreate;
