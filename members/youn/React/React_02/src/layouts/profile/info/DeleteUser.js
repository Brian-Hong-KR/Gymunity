import axios from 'axios';
import React, { useEffect } from 'react';

const DeleteUser = () => {
  const deleteUser = async () => {
    await axios
      .delete(`/member/delete/${localStorage.getItem('userAccountId')}`, config)
      .then((response) => {
        console.log(response);
        localStorage.removeItem('Authorization');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('NickName');
        localStorage.removeItem('isLogin');
        localStorage.clear();
        window.location.replace('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    deleteUser();
  }, [])
};

export default DeleteUser;