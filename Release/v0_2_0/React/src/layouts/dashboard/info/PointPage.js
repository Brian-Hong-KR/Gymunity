// PointPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";


import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";



function PointPage() {
  const [userPoints, setUserPoints] = useState([]);
  const userId = 1; // 사용자 ID (임시로 1로 설정)

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`spring/api/points?userId=${userId}`);
        setUserPoints(response.data);
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    fetchUserPoints();
  }, [userId]);

  return (
    <DashboardLayout>
      
      <div>
        <h1>유저 포인트 관리 페이지 - UserAccountId 입력시 포인트 내역 뜨고..,,</h1>
        <ul>
          {userPoints.map((point) => (
            <li key={point.id}>
              <p>포인트: {point.amount}</p>
              <p>내역: {point.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default PointPage;
