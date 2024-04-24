import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestP() {
  const [data, setData] = useState(null);

  // 데이터 생성 로직 추가 (필요)

  useEffect(() => {
    const postData = {
      "user_id":1,
    };

    axios.post('http://localhost:8090/test', postData)
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  if (!data) return <div>데이터를 불러오는 중입니다...</div>;

  return (
    <div>
      <p>ID: {data.user_id}</p>
      <p>메시지: {data.message}</p>
    </div>
  );
}

export default TestP;

//@bp.route('/test', methods=('POST',))
//def test():
//    data = request.get_json()
//    user_id = data["user_id"]
//    new_data = {
//        'user_id': user_id,
//        'message': 'Hello from Flask!'}
//    return jsonify(new_data)
//#