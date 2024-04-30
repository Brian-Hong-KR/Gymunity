// react-router-dom components
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
import Basket from "examples/Icons/Basket";
import CustomerSupport from "examples/Icons/CustomerSupport";
import SpaceShip from "examples/Icons/SpaceShip";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftAlert from "components/SoftAlert";

// Overview page components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useNavigate, useLocation } from "react-router-dom";


import axios from "axios";

function ChallengeCreate() {
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date(); // 현재 날짜 가져오기
  const defaultStartDate = today.toISOString().split("T")[0];

  // 시작일에서 1주일 더한 날짜 계산
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 7); // 시작일에서 7일(1주일)을 더함
  const defaultEndDate = endDate.toISOString().split("T")[0]; // ISO 형식으로 변환하여 문자열로 가져오기

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [alertMessage, setAlertMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [challenge, setChallenge] = useState({
    title: "",
    content: "",
    category: 1,
    bettingPoint: 200,
    chStartDate: defaultStartDate,
    chEndDate: defaultEndDate,
    verifyTerm: 1,
    challengePeriod : 1,
  });

  // 탭

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [CategoryTabValue, setCategoryTabValue] = useState(0);
  const [tabValue1, setTabValue1] = useState(0);
  const [tabValue2, setTabValue2] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  // 배팅 포인트
  const [bettingPoint, setBettingPoint] = useState(0);

  // 카테고리
  const handleSetTabValue = (event, newValue) => {
    setCategoryTabValue(newValue);

    const categortOptions = {
      0: 1,
      1: 2,
      2: 3,
    };
    const newCategory = categortOptions[newValue];
    setCategoryTabValue(newValue);
    setChallenge((prev) => ({
      ...prev,
      category: newCategory,
    }));
    console.log("카테고리 값:", newCategory);
  };

  const handleSetTabValue1 = (event, newValue) => {
    setTabValue1(newValue);

    const termOptions = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
    };
    const newTerm = termOptions[newValue];

    setChallenge((prev) => ({
      ...prev,
      verifyTerm: newTerm,
    }));
    console.log("빈도 값:", newTerm);
  };

  // 챌린지 기간
  const handleSetTabValue2 = (event, newValue) => {
    setTabValue2(newValue);

    const dateOptions = {
      0: 1,
      1: 2,
      2: 4,
      3: 6,
      4: 8,
    };

    const periodInWeeks = dateOptions[newValue];

    setChallenge((prev) => ({
      ...prev,
      challengePeriod: periodInWeeks,
    }));

    console.log("기간 값:", periodInWeeks);

    if (!challenge.chStartDate) {
      console.error(
        "챌린지 시작일이 비어있습니다. 기본값으로 현재 날짜를 설정합니다."
      );
      const today = new Date();
      setChallenge({
        ...challenge,
        chStartDate: today.toISOString().split("T")[0],
      });
      return;
    }
    const startDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!startDateRegex.test(challenge.chStartDate)) {
      console.error("챌린지 시작일이 올바른 형식이 아닙니다.");
      return;
    }

    const startDate = challenge.chStartDate
      ? new Date(challenge.chStartDate)
      : new Date();

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + periodInWeeks * 7);

    endDate.setDate(endDate.getDate() - 1);

    setChallenge((prev) => ({
      ...prev,
      chEndDate: endDate.toISOString().split("T")[0],
    }));

    console.log("계산된 종료일:", endDate.toISOString().split("T")[0]);
  };




  const handleChangeDate = (event) => {
    let input = event.target.value;

    // 입력값이 숫자로만 이루어져 있는지 확인 (정규식)
    const numericInput = input.replace(/\D/g, "");
    // 입력된 값이 4자리일 때는 'yyyy-' 형식으로, 6자리일 때는 'yyyy-mm-' 형식으로 자동으로 '-'가 추가됩니다
    if (numericInput.length === 4) {
      input = numericInput.replace(/^(\d{4})/, "$1-");
    } else if (numericInput.length === 6) {
      input = numericInput.replace(/^(\d{4})(\d{2})/, "$1-$2-");
    }
    // 입력된 값이 10자리를 넘어가면 더 이상 변환하지 않고 그대로 유지합니다.
    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    // 챌린지 시작일 업데이트
    setChallenge({ ...challenge, chStartDate: input });
  };

  // 입력 이벤트 리스너를 추가하여 숫자 이외의 문자 입력을 방지합니다.
  const handleInput = (event) => {
    const inputValue = event.target.value;
    const onlyDigitsAndDash = inputValue.replace(/[^\d-]/g, "");
    if (inputValue !== onlyDigitsAndDash) {
      // 숫자와 '-'를 제외한 문자가 입력되었을 경우 입력을 막습니다.
      event.target.value = onlyDigitsAndDash;
    }
  };

  //시작일 안 지워져서 하는거임
  const handleKeyDown = (event) => {
    // Backspace 키를 눌렀을 때 '-' 문자를 삭제합니다
    if (event.key === "Backspace") {
      const input = event.target.value;
      if (input[input.length - 1] === "-") {
        // setDate(input.slice(0, input.length - 1)); // 이 부분을 setChallenge로 수정
        setChallenge({
          ...challenge,
          chStartDate: input.slice(0, input.length - 1),
        });
      }
    }
  };

  const handleClearErrorMessage = () => {
    setErrorMessage("");
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    // name이 'bettingPoint' 또는 'category'일 때는 value를 정수형으로 변환하여 상태에 설정
    // 그렇지 않은 경우에는 문자열 그대로 설정
    setChallenge((prev) => ({
      ...prev,
      [name]:
        name === "bettingPoint" || name === "category"
          ? parseInt(value) || ""
          : value,
    }));

    handleClearErrorMessage();
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    
    setErrorMessage("");

    if (challenge.bettingPoint <= 199 || challenge.bettingPoint >= 1001) {
      setErrorMessage("포인트는 200부터 1000포인트를 입력하세요.");
      setShowError(true); // 에러 메시지 박스를 보이게 함
      setTimeout(() => {
        setShowError(false); // 1초 뒤에 에러 메시지 박스를 숨김
      }, 1400);
      return;
    }

    if (
      !challenge.title.trim() ||
      !challenge.content.trim() ||
      challenge.bettingPoint === 0
    ) {
      setErrorMessage("빈 입력란을 작성해주세요.");
      setShowError(true); // 에러 메시지 박스를 보이게 함
      setTimeout(() => {
        setShowError(false); // 1초 뒤에 에러 메시지 박스를 숨김
      }, 900);
      return;
    }

    

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
      },
    };

    console.log("Form submitting", challenge);
    try {
      const response = await axios.post("/challenge/create", challenge, config);
      console.log("Registration successful:", response);
      setSuccessMessage("챌린지가 성공적으로 생성되었습니다.");
      setShowSuccess(true); // 성공 메시지 박스를 보이게 함
      setTimeout(() => {
        setShowSuccess(false); // 1초 뒤에 성공 메시지 박스를 숨김
        navigate("/Challenge/list/1");
      }, 700);
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // 서버가 409를 반환할 때 이미 챌린지가 생성되었음을 알리는 팝업 표시
        setErrorMessage(`${error.response.data}`);
        setShowError(true); // 에러 메시지 박스를 보이게 함
        setTimeout(() => {
          setShowError(false); // 1초 뒤에 에러 메시지 박스를 숨김
        }, 1000);
      } else {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftBox py={3} textAlign="center" paddingBottom={1}>
          <SoftBox mb={3}>
              <SoftTypography variant="h4" fontWeight="bold">챌린지 만들기</SoftTypography>
              <SoftTypography variant="body2" color="text">
                건전하고 공정한 챌린지로 모두 즐겁게 운동할 수 있게 해주세요.
              </SoftTypography>
            </SoftBox>
        </SoftBox>

        <Card>
        <SoftBox component="form" role="form" pt={2} pb={3} px={3} onSubmit={handleCreateChallenge}>
          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
                챌린지 제목
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              placeholder="챌린지 제목"
              name="title"
              value={challenge.title}
              onChange={handleValueChange}
            />
          </SoftBox>

          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
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
                  <Tab label="체중 감소" icon={<CustomerSupport />} />
                  <Tab label="근력 향상" icon={<CustomerSupport />} />
                  <Tab label="종합 건강 증진" icon={<CustomerSupport />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
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
                  <Tab label="매일" icon={<SpaceShip />} />
                  <Tab label="평일" icon={<SpaceShip />} />
                  <Tab label="주말" icon={<SpaceShip />} />
                  <Tab label="주 1일" icon={<SpaceShip />} />
                  <Tab label="주 2일" icon={<SpaceShip />} />
                  <Tab label="주 3일" icon={<SpaceShip />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
                챌린지 시작일
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              name="chStartDate"
              value={challenge.chStartDate}
              placeholder="yyyy-mm-dd"
              onChange={handleChangeDate}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
            />
          </SoftBox>


          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
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
                  <Tab label="4주간" icon={<Cube />} />
                  <Tab label="6주간" icon={<Cube />} />
                  <Tab label="8주간" icon={<Cube />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
                챌린지 소개
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              name="content"
              placeholder="챌린지 소개"
              value={challenge.content}
              onChange={handleValueChange}
            />
          </SoftBox>

          <SoftBox mb={4}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
                배팅 포인트
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="number"
              name="bettingPoint"
              placeholder="배팅 포인트"
              value={challenge.bettingPoint}
              onChange={handleValueChange}
            />
          </SoftBox>

           {showError && (
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
                  )}
          <SoftBox mt={5} mb={1}>
            <SoftButton
              type="submit"
              variant="gradient"
              color="dark"
              style={{ fontSize: '15px' }} 
              fullWidth
              // onClick={handleCreateChallenge}>
            >
              챌린지 만들기
            </SoftButton>
            
          </SoftBox>
          
        </SoftBox>
        
      </Card>

    </DashboardLayout>
  );
}

export default ChallengeCreate;
