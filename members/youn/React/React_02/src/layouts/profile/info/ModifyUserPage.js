import axios from 'axios';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftButtonRoot from 'components/SoftButton/SoftButtonRoot';
import SoftInput from 'components/SoftInput';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModifyUserPage = () => {
  const navigate = useNavigate();
  console.log('ModifyUserPage');

  const [users, setUsers] = useState({
    userEmail: localStorage.getItem('userEmail') || '',
    userPass: '',
    nickName: localStorage.getItem('nickName') || '',
  });

  const { userEmail, userPass, nickName } = users;


  const handleValueChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };


  const [passwordCheck, setPasswordCheck] = useState('');


  const passChang = (e) => {
    if (userPass !== e.target.value) setPasswordCheck('비밀번호 불일치');
    else setPasswordCheck('비밀번호 일치');
  };

  
  const messageStyle = {
    color: passwordCheck === '비밀번호 일치' ? 'green' : 'red',
    fontSize: '14px',
  };

  const info = async () => {
    await axios
      .get(`/user/editinfo/${localStorage.userAccountId}`)
      .then((response) => {
        localStorage.setItem('userId', response.data.userId);
        // console.log(response);
        setUsers((prev) => {
          return { ...prev, ...response.data, userPass: '' };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    info();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userPass) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    
     try {
       const response = await axios.put(`/user/update`, users);
       localStorage.setItem('userEmail', userEmail);
       localStorage.setItem('nickName', nickName);
       navigate('/'); // 수정 후 메인 페이지로 이동
     } catch (error) {
       console.error('Error:', error);
       // 에러 처리 로직 추가
     }
  };

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component='form' role='form' onSubmit={onSubmit}>
            <SoftBox mb={2}></SoftBox>
            <div className='container'>
              
                <div className='container'>
                  <h1>회원정보수정</h1>

                  <SoftBox mb={2}>
                    <div className='form-group mb-1'>
                      <SoftInput
                        type='password'
                        className='form-control'
                        name='userPass'
                        placeholder='비밀번호'
                        value={userPass}
                        onChange={handleValueChange}
                      />
                    </div>
                  </SoftBox>
                  <SoftBox mb={2}>
                    <div className='form-group mb-1'>
                      <SoftInput
                        type='password'
                        className='form-control'
                        name='userPass2'
                        placeholder='비밀번호 확인'
                        onChange={passChang}
                      />
                      <span style={messageStyle}>{passwordCheck}</span>
                    </div>
                  </SoftBox>

                  <SoftBox mb={2}>
                    <div className='form-group mb-1'>
                      <SoftInput
                        type='email'
                        className='form-control'
                        name='userEmail'
                        placeholder='이메일'
                        value={userEmail}
                        onChange={handleValueChange}
                      />
                    </div>
                  </SoftBox>
                  <SoftBox mb={2}>
                    <div className='form-group mb-1'>
                      <SoftInput
                        type='text'
                        className='form-control'
                        name='nickName'
                        placeholder='닉네임'
                        value={nickName}
                        onChange={handleValueChange}
                      />
                    </div>
                  </SoftBox>

                  <SoftBox mb={2} textAlign='center'>
                    <SoftButton
                      SoftButton
                      type='submit'
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

export default ModifyUserPage;
