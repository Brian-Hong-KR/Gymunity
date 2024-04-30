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
import SoftButton from 'components/SoftButton';

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

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
            href='/dashboard/usermanage'
          >
            회원 관리
          </SoftButton>

          <SoftButton
            type='submit'
            variant='gradient'
            color='dark'
            fullWidth
            style={{ width: '30%' }}
            href='/dashboard/editpoint'
          >
            포인트 관리
          </SoftButton>

          <SoftButton
            type='submit'
            variant='gradient'
            color='dark'
            fullWidth
            style={{ width: '30%' }}
            href='/admin/verify'
          >
            사진 인증 관리
          </SoftButton>

          <SoftButton
            type='submit'
            variant='gradient'
            color='dark'
            fullWidth
            style={{ width: '30%' }}
          >
            CS 관리
          </SoftButton>
        </SoftBox>
      </Grid>

      <SoftBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <ReportsBarChart
              title='USER'
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
              title='PT'
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
              title='CHALLENGE'
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
              title='STORE'
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
              title='CS'
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
    </DashboardLayout>
  );
}

export default Dashboard;
