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
              <Link to='/usermanage'>
                <MiniStatisticsCard
                  title={{ text: '유저 관리' }}
                  icon={{ color: 'info', component: 'paid' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to='/point'>
                <MiniStatisticsCard
                  title={{ text: '유저 포인트 관리' }}
                  icon={{ color: 'info', component: 'public' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to='/verify'>
                <MiniStatisticsCard
                  title={{ text: '사진 인증 관리' }}
                  icon={{ color: 'info', component: 'emoji_events' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: '추가할거 있나요???' }}
                icon={{
                  color: 'info',
                  component: 'shopping_cart',
                }}
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
