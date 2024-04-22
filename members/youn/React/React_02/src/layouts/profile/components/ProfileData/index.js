import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom'; 
import { useNavigate, useLocation } from 'react-router-dom';

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



const ProfileData = () => {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  
  const navigate = useNavigate();
  const location = useLocation();


  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm('정말 떠나시겠습니까?');
    if (isConfirmed) {
      navigate('/profile/deleteUser');
    }
  };

  const isLoggedIn = localStorage.getItem('isLogin') === 'true';



  return (
    <SoftBox py={3}>
      <SoftBox mb={3}>
        <SoftBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          p={3}
        >
          <SoftTypography variant='h5'>Nickname</SoftTypography>
          <SoftTypography variant='body2' color='text'>
            {' '}
            Nickname@gmail.com
          </SoftTypography>
        </SoftBox>
        <SoftBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          p={3}
        >
          <Link to='editUser'>
            <SoftButton type='submit' variant='gradient' color='dark' fullWidth>
              회원정보수정
            </SoftButton>
          </Link>

          {isLoggedIn ? (
            <SoftButton
              type='submit'
              variant='gradient'
              color='dark'
              fullWidth
              onClick={() => {
                // 로그아웃 로직 구현
                localStorage.setItem('isLogin', 'false');
                // 다른 로그아웃 작업들도 수행할 수 있습니다.
              }}
            >
              로그아웃
            </SoftButton>
          ) : (
            <Link to='/authentication/sign-in'>
              <SoftButton
                type='submit'
                variant='gradient'
                color='dark'
                fullWidth
              >
                로그인
              </SoftButton>
            </Link>
          )}
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: 'Grade' }}
              count='실버'
              icon={{ color: 'dark', component: 'paid' }}
              text='다음 등급까지 300포인트'
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: 'Point' }}
              count='530'
              icon={{ color: 'dark', component: 'paid' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: 'Plan' }}
              count='요요 다이어트'
              icon={{ color: 'dark', component: 'public' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: 'Challenge' }}
              count='매일 유산소 1h'
              icon={{ color: 'dark', component: 'emoji_events' }}
              text='카테고리 : 체지방 감소'
            />
          </Grid>
        </Grid>
      </SoftBox>

      <SoftBox
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={3}
      >
        <Link to='/modifyPlan'>
          <SoftButton type='submit' variant='gradient' color='dark' fullWidth>
            플랜 다시 세우기
          </SoftButton>
        </Link>

        <Link to='/photo'>
          <SoftButton type='submit' variant='gradient' color='dark' fullWidth>
            나의 사진첩
          </SoftButton>
        </Link>
      </SoftBox>

      <SoftBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <ReportsBarChart title='Weekly Point' chart={chart} />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={3}
      >
        <Link to='/customService'>
          <SoftButton type='submit' variant='gradient' color='dark'>
            고객 문의
          </SoftButton>
        </Link>

        <Link to='deleteUser'>
          <SoftButton
            type='submit'
            variant='gradient'
            color='white'
            onClick={handleDeleteAccount}
          >
            회원탈퇴
          </SoftButton>
        </Link>
      </SoftBox>
    </SoftBox>
  );
};

export default ProfileData;
