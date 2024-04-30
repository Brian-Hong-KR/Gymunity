import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

import typography from "assets/theme/base/typography";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import Table from "examples/Tables/Table";

import { Link } from "react-router-dom"; // react-router-dom을 사용하여 링크를 관리합니다.

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import { useEffect, useState } from "react";
import axios from "axios";
import SoftButton from "components/SoftButton";

function AdminInfo() {
  const { chart, items } = reportsBarChartData;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const [adminInfo, setAdminInfo] = useState({
    referrerSignUp: {},
    signIn: {},
    signUp: {},
    submissions: {},
  });

  const [chartData1, setChartData1] = useState({ labels: [], datasets: [] });
  const [chartData2, setChartData2] = useState({ labels: [], datasets: [] });
  const [chartData3, setChartData3] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/admin/info", config);
        const data = response.data;
        console.log(data);
        setAdminInfo(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const labels = Array.from(
      new Set([
        ...Object.keys(adminInfo.submissions),
        ...Object.keys(adminInfo.signUp),
        ...Object.keys(adminInfo.signIn),
        ...Object.keys(adminInfo.referrerSignUp),
      ])
    );

    labels.sort();

    if (labels.length > 0) {
      const dataSubmissions = labels.map(
        (label) => adminInfo.submissions[label] || 0
      );
      const dataSignUps = labels.map((label) => adminInfo.signUp[label] || 0);
      const dataSignIns = labels.map((label) => adminInfo.signIn[label] || 0);
      const dataReferrerSignUps = labels.map(
        (label) => adminInfo.referrerSignUp[label] || 0
      );

      // 차트 1
      setChartData1({
        labels,
        datasets: [
          {
            label: "유입수",
            color: "error",
            data: dataSubmissions,
          },
          {
            label: "회원가입수",
            color: "warning",
            data: dataSignUps,
          },
        ],
      });

      // 차트 2
      setChartData2({
        labels,
        datasets: [
          {
            label: "회원가입수",
            color: "info",
            data: dataSignUps,
          },
          {
            label: "활동수",
            color: "error",
            data: dataSignIns,
          },
        ],
      });

      // 차트 3
      setChartData3({
        labels,
        datasets: [
          {
            label: "회원가입수",
            color: "info",
            data: dataSignUps,
          },
          {
            label: "추천인가입수",
            color: "error",
            data: dataReferrerSignUps,
          },
        ],
      });
    }
  }, [adminInfo]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} lg={5}>
        <SoftBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          p={3}
        >
          <SoftButton
            type='submit'
            variant='gradient'
            color='dark'
            fullWidth
            style={{ width: '30%' }}
          >
            회원 관리
          </SoftButton>

          <SoftButton
            type="submit"
            variant="gradient"
            color="dark"
            fullWidth
            style={{ width: "30%" }}
            href="/admin/editpoint"
          >
            포인트 관리
          </SoftButton>

          <SoftButton
            type="submit"
            variant="gradient"
            color="dark"
            fullWidth
            style={{ width: "30%" }}
          >
            CS 관리
          </SoftButton>
        </SoftBox>
      </Grid>

      <SoftBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="유입자 회원가입"
              height="20.25rem"
              chart={chartData1}
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="회원가입 로그인"
              height="20.25rem"
              chart={chartData2}
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="회원가입 추천가입"
              height="20.25rem"
              chart={chartData3}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <GymunityNavbar />
    </DashboardLayout>
  );
}

export default AdminInfo;
