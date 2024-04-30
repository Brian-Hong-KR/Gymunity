import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link, useNavigate } from "react-router-dom"; // react-router-dom을 사용하여 링크를 관리합니다.

import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { gConst } from "layouts/gConst";
import SoftButton from "components/SoftButton";

function AdminInfo() {
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization") || "",
      "Authorization-refresh":
        localStorage.getItem("Authorization-refresh") || "",
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
        const response = await axios.get(
          `${gConst.API_BASE_URL}:8090/admin/info`,
          config
        );
        const data = response.data;
        setAdminInfo(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        if (error.response) {
          if (error.response.status === 403) {
            alert("접근 권한이 없습니다.");
            navigate("/profile");
          } else {
            alert("서버 오류가 발생했습니다.");
            navigate("/main");
          }
        } else {
          alert("네트워크 오류가 발생했습니다.");
          navigate("/main");
        }
      }
    }
    fetchData();
  }, [navigate]);

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
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={5}>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <SoftButton
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
              style={{ width: "24%" }}
              href="/dashboard/usermanage"
            >
              회원 관리
            </SoftButton>

            <SoftButton
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
              style={{ width: "24%" }}
              href="/dashboard/editpoint"
            >
              포인트 관리
            </SoftButton>

            <SoftButton
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
              style={{ width: "24%" }}
              href="/admin/verify"
            >
              사진 인증 관리
            </SoftButton>

            <SoftButton
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
              style={{ width: "24%" }}
            >
              CS 관리
            </SoftButton>
          </SoftBox>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        {" "}
        {/* 두 번째 그리드 컨테이너를 중앙 정렬 */}
        <Grid item xs={12} lg={9}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <GradientLineChart
                  title="유입자 회원가입"
                  height="20.25rem"
                  chart={chartData1}
                />
              </Grid>
              <Grid item xs={12}>
                <GradientLineChart
                  title="회원가입 로그인"
                  height="20.25rem"
                  chart={chartData2}
                />
              </Grid>
              <Grid item xs={12}>
                <GradientLineChart
                  title="회원가입 추천가입"
                  height="20.25rem"
                  chart={chartData3}
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default AdminInfo;
