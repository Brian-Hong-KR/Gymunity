import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

import typography from 'assets/theme/base/typography';
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import Table from "examples/Tables/Table";

import { Link } from 'react-router-dom'; // react-router-dom을 사용하여 링크를 관리합니다.

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

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
                title="USER"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="CHALLENGE"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="STORE"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="CS"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
          </Grid>
        </SoftBox>
      <GymunityNavbar />
    </DashboardLayout>
  );
}

export default Dashboard;
