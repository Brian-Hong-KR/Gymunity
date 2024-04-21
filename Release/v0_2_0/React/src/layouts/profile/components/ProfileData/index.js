import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

import SoftButton from "components/SoftButton";

const ProfileData = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  // const { size } = typography;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [profileInfo, setProfileInfo] = useState({
    nickName: "",
    userEmail: "",
    gradeName: "",
    currentPoints: 0,
    planName: "",
    pointToNextGrade: 0,
    challenges: [],
    weeklyPoints: [],
  });

  const categoryMapping = {
    1: "안아프게해주세요.",
    2: "근육짱짱맨",
    3: "나는 살뺄거야",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/editinfo`, config);
        const data = response.data;

        // 프로필 정보 출력
        console.log("Profile data:", data);

        // 프로필 정보 업데이트
        setProfileInfo({
          nickName: data.nickName,
          userEmail: data.userEmail,
          gradeName: data.gradeName,
          currentPoints: data.currentPoints,
          planName: data.planName,
          pointToNextGrade: data.pointToNextGrade,
          challenges: data.challenges,
          weeklyPoints: data.weeklyPoints,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchData();
  }, []);

  // 그래프에 맞춰서 세팅
  useEffect(() => {
    if (profileInfo.weeklyPoints.length > 0) {
      const labels = profileInfo.weeklyPoints.map((point) => point.dayname);
      const data = profileInfo.weeklyPoints.map((point) => point.netPoints);

      setChartData({
        labels: labels,
        datasets: {
          label: "Point",
          data: data,
        },
      });
    }
  }, [profileInfo.weeklyPoints]);

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm("정말 떠나시겠습니까?");
    if (isConfirmed) {
      // 여기에 회원탈퇴 로직을 추가하세요.
    }
  };
  return (
    <SoftBox py={3}>
      <SoftBox mb={3}>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <SoftTypography variant="h5">{profileInfo.nickName}</SoftTypography>
          <SoftTypography variant="body2" color="text">
            {" "}
            {profileInfo.userEmail}
          </SoftTypography>
        </SoftBox>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <Link to="editUser">
            <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
              회원정보수정
            </SoftButton>
          </Link>

          <Link to="/authentication/sign-in">
            <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
              로그아웃
            </SoftButton>
          </Link>
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Grade" }}
              count={profileInfo.gradeName}
              icon={{ color: "dark", component: "paid" }}
              text={`다음 등급까지 ${profileInfo.pointToNextGrade.toString()} point`}
              percentage={{ color: "success", text: "" }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Point" }}
              count={profileInfo.currentPoints}
              icon={{ color: "dark", component: "paid" }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Plan" }}
              count={profileInfo.planName}
              icon={{ color: "dark", component: "public" }}
            />
          </Grid>

          {profileInfo.challenges.map((challenge, index) => (
            <Grid item xs={12} sm={6} xl={3} key={index}>
              <MiniStatisticsCard
                title={{ text: "Challenge" }}
                count={challenge.title}
                icon={{ color: "dark", component: "emoji_events" }}
                text={`카테고리 : ${
                  categoryMapping[challenge.category] || "기타"
                }`}
              />
            </Grid>
          ))}
        </Grid>
      </SoftBox>

      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Link to="/modifyPlan">
          <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
            플랜 다시 세우기
          </SoftButton>
        </Link>

        <Link to="/profile/photo">
          <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
            나의 사진첩
          </SoftButton>
        </Link>
      </SoftBox>

      <SoftBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <ReportsBarChart
              title="Weekly Point"
              description={
                <>
                  (<strong>+23%</strong>) than last week
                </>
              }
              chart={chartData}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Link to="/customService">
          <SoftButton type="submit" variant="gradient" color="dark">
            고객 문의
          </SoftButton>
        </Link>

        <SoftButton
          type="submit"
          variant="gradient"
          color="white"
          onClick={handleDeleteAccount}
        >
          회원탈퇴
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};

export default ProfileData;
