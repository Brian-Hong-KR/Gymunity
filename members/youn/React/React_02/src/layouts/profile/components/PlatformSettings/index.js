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
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Header from '../Header';
import SoftButton from 'components/SoftButton';

function PlatformSettings() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm('정말 떠나시겠습니까?');
    if (isConfirmed) {
      // 여기에 회원탈퇴 로직을 추가하세요.
    }
  };

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'Point' }}
                count='530'
                icon={{ color: 'info', component: 'paid' }}
                text='다음 등급까지 300포인트'
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to='/modifyPlan'>
                <MiniStatisticsCard
                  title={{ text: 'Plan' }}
                  count='요요 다이어트'
                  icon={{ color: 'info', component: 'public' }}
                />
              </Link>
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
                  count='나의 사진첩'
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
        <SoftBox mt={4} mb={1}>
          <Link to='modifyUser'>
            <SoftButton type='submit' variant='gradient' color='info' fullWidth>
              회원정보 수정
            </SoftButton>
          </Link>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            type='submit'
            variant='gradient'
            color='error'
            fullWidth
            onClick={handleDeleteAccount}
            to='/profile/deleteUser'
          >
            회원탈퇴
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PlatformSettings;
