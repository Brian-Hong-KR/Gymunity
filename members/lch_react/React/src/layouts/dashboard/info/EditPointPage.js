import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import GymunityNavbar from 'examples/Navbars/GymunityNavbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import Table from 'examples/Tables/Table';
import typography from 'assets/theme/base/typography';

const EditPointPage = () => {
  const [userAccountId, setUserAccountId] = useState('');
  const [userId, setUserId] = useState(null);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [reason, setReason] = useState('');
  const [pointAdjust, setPointAdjust] = useState(0);

  const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
      'Authorization-refresh': localStorage.getItem('Authorization-refresh'),
    },
  };


    const [rows, setRows] = useState([]);
const { size, fontWeightBold } = typography;
    const columns = [
      { name: '이유', align: 'center' },
      { name: '포인트', align: 'center' },
      { name: '날짜', align: 'center' },
  ];
  
  const handleUserAccountIdChange = (event) => {
    setUserAccountId(event.target.value);
  };


  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handlePointAdjustChange = (event) => {
    setPointAdjust(parseInt(event.target.value));
  };

  const getUserIDByAccountID = async () => {
    try {
      const response = await axios.get(
        `/points/user/${userAccountId}`,
        baseConfig
      );
      setUserId(response.data);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const getPointsHistoryByUserID = async () => {
    try {
      const response = await axios.get(
        `/points/history/${userId}`,
        baseConfig
      );
      setPointsHistory(response.data);
    } catch (error) {
      console.error('Error fetching points history:', error);
    }
  };

  const adjustPoints = async () => {
    try {
      await axios.post(
        '/points/adjustPoints',
        {
          pointsAdjusted: pointAdjust,
          reason: reason,
          userId: userId,
        },
        baseConfig
      );
      // After adjusting points, fetch the updated points history
      getPointsHistoryByUserID();
    } catch (error) {
      console.error('Error adjusting points:', error);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      getPointsHistoryByUserID();
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox mb={2} style={{ display: 'flex', alignItems: 'center' }}>
            <SoftTypography
              component='label'
              fontWeight='bold'
              style={{ width: '30%' }}
            >
              ID:
            </SoftTypography>

            <SoftInput
              type='text'
              value={userAccountId}
              onChange={handleUserAccountIdChange}
              style={{ width: '30%' }}
            />

            <SoftButton
              color='dark'
              onClick={getUserIDByAccountID}
              style={{ width: '30%' }}
            >
              Point List
            </SoftButton>
          </SoftBox>
        </SoftBox>

        {userId !== null && (
          <div>
            <SoftBox pt={2} pb={3} px={3}>
              <SoftBox mb={2} style={{ display: 'flex', alignItems: 'center' }}>
                <SoftTypography component='label' fontWeight='bold'>
                  Point:
                </SoftTypography>
                <SoftInput
                  type='number'
                  value={pointAdjust}
                  onChange={handlePointAdjustChange}
                />
                <SoftTypography component='label' fontWeight='bold'>
                  Reason:
                </SoftTypography>
                <SoftInput
                  type='text'
                  value={reason}
                  onChange={handleReasonChange}
                />
              </SoftBox>
            </SoftBox>

            <SoftButton color='dark' onClick={adjustPoints} fullWidth>
              Adjust Points
            </SoftButton>
            <SoftBox
              pt={2}
              pb={3}
              px={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Table columns={columns} rows={rows} />
              {pointsHistory.map((entry, index) => (
                <SoftBox
                  mb={2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                  key={index}
                  fontSize={size.xs}
                >
                  <td style={{ marginRight: 'auto' }}>{entry.reason}</td>
                  <td style={{ marginRight: 'auto' }}>{entry.points}</td>
                  <td style={{ marginRight: 'auto' }}>{entry.time}</td>
                </SoftBox>
              ))}
            </SoftBox>
          </div>
        )}
      </div>

      <GymunityNavbar />
    </DashboardLayout>
  );
};

export default EditPointPage;
