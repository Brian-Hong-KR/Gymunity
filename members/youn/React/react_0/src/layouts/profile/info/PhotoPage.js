// React에서 백엔드 API 호출하고 사진 데이터 표시하는 코드

import React, { useState, useEffect } from "react";
import axios from "axios";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

import Header from '../components/Header';

const PhotoPage = () => {
  const [photos, setPhotos] = useState([]);



  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("/api/photos");
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <DashboardLayout>
    <DashboardNavbar/>  
      <h1>Photo 페이지</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.filePath} alt={photo.fileName} className="photo-item" />
        ))}
      </div>
      
    </DashboardLayout>
  );
};

export default PhotoPage;
