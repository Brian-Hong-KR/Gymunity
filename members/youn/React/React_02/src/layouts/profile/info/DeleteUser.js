import axios from 'axios';
import { useEffect } from 'react';

const DeleteUser = () => {
  const deleteUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
        'Authorization-refresh': localStorage.getItem('Authorization-refresh'),
      },
    };

    try {
      const response = await axios.delete(
        `/user/delete/${localStorage.getItem('userId')}`,
        config
      );
      console.log(response);
      console.log('회원 정보 삭제 완료');
      localStorage.clear();
      window.location.replace('/');
    } catch (error) {
      console.log('회원 정보 삭제 실패:', error);
    }
  };

  useEffect(() => {
    deleteUser();
  }, []);
};

export default DeleteUser;
