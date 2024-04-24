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
import gradientLineChartData from "./data/gradientLineChartData";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <ReportsBarChart
              title="PT"
              description={
                <>
                  (<strong>+23%</strong>) than last week
                </>
              }
              chart={chart}
              items={items}
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Sales Overview"
              description={
                <SoftBox display="flex" alignItems="center">
                  <SoftBox
                    fontSize={size.lg}
                    color="success"
                    mb={0.3}
                    mr={0.5}
                    lineHeight={0}
                  >
                    <Icon className="font-bold">arrow_upward</Icon>
                  </SoftBox>
                  <SoftTypography
                    variant="button"
                    color="text"
                    fontWeight="medium"
                  >
                    4% more{" "}
                    <SoftTypography
                      variant="button"
                      color="text"
                      fontWeight="regular"
                    >
                      in 2021
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox>
              }
              height="20.25rem"
              chart={gradientLineChartData}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <GymunityNavbar />
    </DashboardLayout>
  );
}

export default Dashboard;
