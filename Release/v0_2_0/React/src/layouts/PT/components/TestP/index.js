import React, { useState, useEffect } from 'react';

function TestP() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/test')
      .then(response => response.json())
      .then(responseData => setData(responseData.return));
  }, []);

  return (
    <div>
      {data}
    </div>
  );
}

export default TestP;