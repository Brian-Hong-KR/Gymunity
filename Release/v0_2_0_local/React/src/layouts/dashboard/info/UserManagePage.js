import typography from 'assets/theme/base/typography';
import axios from 'axios';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import GymunityNavbar from 'examples/Navbars/GymunityNavbar';
import Table from 'examples/Tables/Table';
import React, { useEffect, useState } from 'react';

const UserManagePage = () => {
  const [nickName, setNickName] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [newNickName, setNewNickName] = useState('');

  const handleChangeNickName = (event) => {
    setNickName(event.target.value);
  };

  const handleChangeNewNickName = (event) => {
    setNewNickName(event.target.value);
  };

  const handleGetUserDetails = () => {
    axios
      .get(`/getUserDetails/${nickName}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };



  const handleToggleIsActive = () => {
    if (!userInfo) return;
    const userId = userInfo.userId;
    axios
      .put(`/updateIsActive?userId=${userId}`)
      .then(() => {
        // Toggle isActive in userInfo
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          isActive: prevUserInfo.isActive === 'y' ? 'n' : 'y',
        }));
      })
      .catch((error) => {
        console.error('Error toggling isActive:', error);
      });
  };


 const handleCheckAndUpdateNickName = async () => {
   if (!newNickName.trim()) {
     alert('닉네임을 입력하세요.');
     return;
   }

   try {
     const response = await axios.get(`/checkUserNickname/${newNickName}`);

     if (response.status === 200) {
       // 사용 가능한 닉네임일 경우
       alert('사용할 수 있는 닉네임입니다.');
       // 닉네임 업데이트
       if (userInfo) {
         const userId = userInfo.userId;
         axios
           .put(`/updateNickName?userId=${userId}&nickName=${newNickName}`)
           .then(() => {
             setUserInfo((prevUserInfo) => ({
               ...prevUserInfo,
               nickName: newNickName,
             }));
             setNewNickName('');
           })
           .catch((error) => {
             console.error('Error updating nickname:', error);
           });
       }
     } else {
       console.error('Unexpected status code:', response.status);
     }
   } catch (error) {
     if (error.response && error.response.status === 409) {
       // 이미 존재하는 닉네임일 경우
       alert('이미 존재하는 닉네임입니다.');
     } else {
       console.error('Error checking username:', error);
       alert('이미 존재하는 닉네임입니다.');
     }
   }
 };


  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox pt={2} pb={3} px={3}>
        <SoftBox mb={2} style={{ display: 'flex', alignItems: 'center' }}>
          <SoftTypography
            component='label'
            fontWeight='bold'
            style={{ width: '30%' }}
          >
            NickName:
          </SoftTypography>
          <SoftInput
            type='text'
            value={nickName}
            onChange={handleChangeNickName}
            placeholder='Enter nick name'
            style={{ width: '30%' }}
          />
          <SoftButton
            color='dark'
            onClick={handleGetUserDetails}
            style={{ width: '30%' }}
          >
            Get Info
          </SoftButton>
        </SoftBox>
      </SoftBox>
      {userInfo && (
        <div>
          <SoftBox
            pt={1}
            pb={3}
            px={3}
            alignItems='center'
            style={{
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '15px',
            }}
          >
            <h2>회원 정보</h2>
            <SoftTypography fontWeight='bold'>
              User ID: {userInfo.userId}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              User Account ID: {userInfo.userAccountId}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              Nick Name: {userInfo.nickName}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              Grade Name: {userInfo.gradeName}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              Last Signin: {userInfo.lastSignin}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              Is Active: {userInfo.isActive}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              User Email: {userInfo.userEmail}
            </SoftTypography>
          </SoftBox>

          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox mb={2} style={{ display: 'flex', alignItems: 'center' }}>
              <SoftInput
                type='text'
                value={newNickName}
                onChange={handleChangeNewNickName}
                style={{ width: '40%' }}
                placeholder='Enter new nick name'
              />
              <SoftButton
                color='dark'
                onClick={handleCheckAndUpdateNickName}
                style={{ width: '40%' }}
              >
                Update Nick Name
              </SoftButton>
            </SoftBox>
            <SoftButton
              onClick={handleToggleIsActive}
              fullWidth
              style={{
                color: userInfo.isActive === 'y' ? 'red' : 'blue',
              }}
            >
              {userInfo.isActive === 'y' ? 'Deactivate' : 'Activate'}
            </SoftButton>
          </SoftBox>
        </div>
      )}
    </DashboardLayout>
  );
};



export default UserManagePage;
