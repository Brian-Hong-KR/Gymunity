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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

function ChallengeCreate() {
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [challenge, setChallenge] = useState({
    title: "",
    content: "",
    category: 1,
    bettingPoint: 200,
    chStartDate: "",
    chEndDate: "",
    verifyTerm: 1,
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
      3: 8,
    };

    const periodInWeeks = dateOptions[newValue];

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
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();

    if (
      !challenge.title.trim() ||
      !challenge.content.trim() ||
      challenge.bettingPoint === 0
    ) {
      setErrorMessage("빈 입력란을 작성해주세요.");
      return;
    }

    if (challenge.bettingPoint <= 199) {
      alert("배팅 포인트를 200 이상으로 작성하세요.");
      setBettingPoint(""); // 배팅 포인트 리셋
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
      const response = await axios.post("http://192.168.0.60:8090/challenge/create", challenge, config);
      console.log("Registration successful:", response);
      alert("챌린지가 성공적으로 생성되었습니다.");
      navigate("/Challenge/list/1");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // 서버가 409를 반환할 때 이미 챌린지가 생성되었음을 알리는 팝업 표시
        alert(`${error.response.data}`);
      } else {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <CoverLayout
        title="챌린지 만들기"
        description="건전하고 공정한 챌린지로 모두 즐겁게 운동할 수 있게 해주세요."
        image={curved9}
      >
        <SoftBox component="form" role="form" onSubmit={handleCreateChallenge}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
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

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
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
                  <Tab label="체중 감소" icon={<Cube />} />
                  <Tab label="근력 향상" icon={<Document />} />
                  <Tab label="종합 건강 증진" icon={<Settings />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
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
              <SoftTypography
                component="label"
                variant="caption"
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

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
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
                  <Tab label="4주간" icon={<Document />} />
                  <Tab label="8주간" icon={<Settings />} />
                </Tabs>
              </AppBar>
            </Grid>
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
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

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
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

          {errorMessage && <p>{errorMessage}</p>}
          <SoftBox mt={4} mb={1}>
            <SoftButton
              type="submit"
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
