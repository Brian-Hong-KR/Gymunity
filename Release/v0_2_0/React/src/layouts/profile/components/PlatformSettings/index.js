// @mui material components
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom'; // react-router-dom을 사용하여 링크를 관리합니다.

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Footer from 'examples/Footer';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';

// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography';

// Data
import reportsBarChartData from 'layouts/profile/data/reportsBarChartData';

function PlatformSettings() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to='/point'>
                <MiniStatisticsCard
                  title={{ text: 'Point' }}
                  count='530'
                  icon={{ color: 'info', component: 'paid' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'Plan' }}
                count='요요 다이어트'
                icon={{ color: 'info', component: 'public' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'Challenge' }}
                count='하루 한시간씩 유산소 하기'
                icon={{ color: 'info', component: 'emoji_events' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to='/photo'>
                <MiniStatisticsCard
                  title={{ text: 'Photo' }}
                  count='인증 사진 확인하기'
                  icon={{
                    color: 'info',
                    component: 'shopping_cart',
                  }}
                />
              </Link>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title='Weekly Point'
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PlatformSettings;
