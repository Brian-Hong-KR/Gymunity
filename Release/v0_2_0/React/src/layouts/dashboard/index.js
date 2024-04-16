// @mui material components
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';

// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography';

// Dashboard layout components
import BuildByDevelopers from 'layouts/dashboard/components/BuildByDevelopers';
import WorkWithTheRockets from 'layouts/dashboard/components/WorkWithTheRockets';
import Projects from 'layouts/dashboard/components/Projects';
import OrderOverview from 'layouts/dashboard/components/OrderOverview';

// Data
import gradientLineChartData from 'layouts/dashboard/data/gradientLineChartData';

import { Link } from 'react-router-dom'; // react-router-dom을 사용하여 링크를 관리합니다.

function Dashboard() {
  const { size } = typography;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: '오늘 가입 유저 수' }}
                count='100'
                percentage={{ color: 'success', text: '+55%' }}
                icon={{ color: 'info', component: 'paid' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: '오늘 활동 유저 수' }}
                count='4320'
                percentage={{ color: 'success', text: '+3%' }}
                icon={{ color: 'info', component: 'public' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to='/usermanage'>
                <MiniStatisticsCard
                  title={{ text: '총 유저 수' }}
                  count='6000'
                  percentage={{ color: 'error', text: '-2%' }}
                  icon={{ color: 'info', component: 'emoji_events' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: '오늘 탈퇴 유저 수' }}
                count='100'
                percentage={{ color: 'success', text: '+5%' }}
                icon={{
                  color: 'info',
                  component: 'shopping_cart',
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title='유저 회원가입 수'
                description={
                  <SoftBox display='flex' alignItems='center'>
                    <SoftBox
                      fontSize={size.lg}
                      color='success'
                      mb={0.3}
                      mr={0.5}
                      lineHeight={0}
                    >
                      <Icon className='font-bold'>arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography
                      variant='button'
                      color='text'
                      fontWeight='medium'
                    >
                      11% more{' '}
                      <SoftTypography
                        variant='button'
                        color='text'
                        fontWeight='regular'
                      >
                        in 2024
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height='20.25rem'
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
