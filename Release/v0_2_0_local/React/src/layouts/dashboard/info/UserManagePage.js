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
          isActive: prevUserInfo.isActive === '활성화' ? '비활성화' : '활성화',
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
            style={{ width: '30%', marginRight: '2%' }}
          >
            닉네임:
          </SoftTypography>
          <SoftInput
            type='text'
            value={nickName}
            onChange={handleChangeNickName}
            placeholder='닉네임 입력하세요'
            style={{ width: '10%', marginRight: '2%' }}
          />
          <SoftButton
            color='dark'
            onClick={handleGetUserDetails}
            style={{ width: '50%', marginRight: '2%' }}
          >
            정보 불러오기
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
              유저 번호: {userInfo.userId}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              유저 ID: {userInfo.userAccountId}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              닉네임: {userInfo.nickName}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              등급: {userInfo.gradeName}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              최근 접속일: {userInfo.lastSignin}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              상태: {userInfo.isActive}
            </SoftTypography>
            <SoftTypography fontWeight='bold'>
              이메일: {userInfo.userEmail}
            </SoftTypography>
          </SoftBox>

          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox mb={2} style={{ display: 'flex', alignItems: 'center' }}>
              <SoftInput
                type='text'
                value={newNickName}
                onChange={handleChangeNewNickName}
                style={{ width: '40%', marginRight: '2%' }}
                placeholder='수정할 닉네임을 입력하세요(필수 X)'
              />
              <SoftButton
                color='dark'
                onClick={handleCheckAndUpdateNickName}
                style={{ width: '40%', marginRight: '2%' }}
              >
                닉네임 수정하기
              </SoftButton>
            </SoftBox>
            <SoftButton
              onClick={handleToggleIsActive}
              fullWidth
              style={{
                color: userInfo.isActive === '활성화' ? 'red' : 'blue',
              }}
            >
              {userInfo.isActive === '활성화' ? '비활성화' : '활성화'}
            </SoftButton>
          </SoftBox>
        </div>
      )}
    </DashboardLayout>
  );
};



export default UserManagePage;
