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

  const handleUpdateNickName = () => {
    if (!userInfo) return;
    const userId = userInfo.userId;
    axios
      .put(`/updateNickName?userId=${userId}&nickName=${newNickName}`)
      .then(() => {
        // Update nickName in userInfo
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          nickName: newNickName,
        }));
        setNewNickName(''); // Clear the new nick name input field
      })
      .catch((error) => {
        console.error('Error updating nickname:', error);
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

  return (
    <div>
      <input
        type='text'
        value={nickName}
        onChange={handleChangeNickName}
        placeholder='Enter nick name'
      />
      <button onClick={handleGetUserDetails}>Get User Details</button>

      {userInfo && (
        <div>
          <h2>User Details</h2>
          <p>User ID: {userInfo.userId}</p>
          <p>User Account ID: {userInfo.userAccountId}</p>
          <p>Nick Name: {userInfo.nickName}</p>
          <p>Grade Name: {userInfo.gradeName}</p>
          <p>Last Signin: {userInfo.lastSignin}</p>
          <p>Is Active: {userInfo.isActive}</p>
          <p>User Email: {userInfo.userEmail}</p>

          <input
            type='text'
            value={newNickName}
            onChange={handleChangeNewNickName}
            placeholder='Enter new nick name'
          />
          <button onClick={handleUpdateNickName}>Update Nick Name</button>
          <button onClick={handleToggleIsActive}>
            {userInfo.isActive === 'y' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      )}
    </div>
  );
};



export default UserManagePage;
