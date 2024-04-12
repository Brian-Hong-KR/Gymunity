import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestP() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  if (!data) return <div>데이터를 불러오는 중입니다...</div>;

  return (
    <div>
      <p>메시지: {data.message}</p>
    </div>
  );
}

export default TestP;