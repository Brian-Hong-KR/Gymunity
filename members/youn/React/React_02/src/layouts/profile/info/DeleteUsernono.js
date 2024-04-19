import axios from 'axios';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeleteUsernono = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    userAccountId: localStorage.getItem('userAccountId'),
    password: '',
    password2: '',
    
  });

  const { userAccountId, password, password2, userId } = users;

  const handleValueChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const [passwordCheck, setPasswordCheck] = useState('');

  const passChange = (e) => {
    setPasswordCheck(
      e.target.value === password ? '비밀번호 일치' : '비밀번호 불일치'
    );
  };

  const messageStyle = {
    color: passwordCheck === '비밀번호 일치' ? 'green' : 'red',
    fontSize: '14px',
  };

  const deleteUser = async () => {
     console.log('sdfsdfsdfsdfsdf:', userAccountId);
     console.log('sdfsdfsdfsdfsdf:', userId);
    console.log('sdfsdfsdfsdfsdf:', password);
    
    if (password === password2 && passwordCheck === '비밀번호 일치') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
          'Authorization-refresh': localStorage.getItem(
            'Authorization-refresh'
          ),
        },
      };

      try {
        const response = await axios.delete(`/user/delete/${userId}`, config);
        console.log(response);
        localStorage.clear();
        window.location.replace('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('비밀번호를 확인해주세요.');
    }
  };

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component='form' role='form'>
            <SoftBox mb={2}></SoftBox>
            <div className='container'>
              <div className='container'>
                <h1>회원탈퇴</h1>

                <SoftBox mb={2}>
                  <div className='form-group mb-1'>
                    <SoftInput
                      type='userAccountId'
                      className='form-control'
                      name='userAccountId'
                      placeholder='이메일'
                      value={userAccountId}
                    />
                  </div>
                </SoftBox>

                <SoftBox mb={2}>
                  <div className='form-group mb-1'>
                    <SoftInput
                      type='password'
                      className='form-control'
                      name='password'
                      placeholder='비밀번호'
                      value={password}
                      onChange={handleValueChange}
                    />
                  </div>
                </SoftBox>
                <SoftBox mb={2}>
                  <div className='form-group mb-1'>
                    <SoftInput
                      type='password'
                      className='form-control'
                      name='password2'
                      placeholder='비밀번호 확인'
                      onChange={passChange}
                    />
                    <span style={messageStyle}>{passwordCheck}</span>
                  </div>
                </SoftBox>
                <SoftBox mb={2}>
                  <div className='form-group mb-1'>
                    <SoftInput
                      type='text'
                      className='form-control'
                      name='userId'
                      placeholder='userId'
                      value={userId}
                      onChange={handleValueChange}
                    />
                  </div>
                </SoftBox>

                <SoftBox mb={2} textAlign='center'>
                  <SoftButton
                    onClick={deleteUser} // 탈퇴 버튼 클릭 시 deleteUser 함수 실행
                    type='button'
                    variant='gradient'
                    color='info'
                    fullWidth
                  >
                    회원정보 수정
                  </SoftButton>
                </SoftBox>
              </div>
            </div>
          </SoftBox>
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
};

export default DeleteUsernono;
