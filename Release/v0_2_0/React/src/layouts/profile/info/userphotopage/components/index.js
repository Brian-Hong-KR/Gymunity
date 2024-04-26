// React에서 백엔드 API 호출하고 사진 데이터 표시하는 코드

import React, { useState, useEffect } from "react";
import axios from "axios";
import { gConst } from 'layouts/gConst';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";

const PhotoList = () => {
  const imgStyle = {
    width: "100%",
    maxWidth: "100px",
    height: "auto",
  };

  const baseConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const [rows, setRows] = useState([]);

  const columns = [
    { name: "사진1", align: "center" },
    { name: "사진2", align: "center" },
    { name: "챌린지", align: "center" },
    { name: "진행여부", align: "center" },
    { name: "날짜", align: "left" },
  ];

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    axios
      .get(`${gConst.API_BASE_URL}:8090/user/photo`, baseConfig)
      .then((response) => {
        console.log("Received data:", response.data);
        const newRows = response.data.map((photo) => ({
          사진1: photo.imagePath1 ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/${photo.imagePath1}`}
                alt="User Photo 1"
                style={imgStyle}
              />
              {photo.proceed === "rec" && (
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  fullWidth
                  onClick={() => deletePhoto(photo.imagePath1)}
                >
                  삭제
                </SoftButton>
              )}
            </>
          ) : (
            <span>사진 없음</span>
          ),
          사진2: photo.imagePath2 ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/${photo.imagePath2}`}
                alt="User Photo 2"
                style={imgStyle}
              />
              {photo.proceed === "rec" && (
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  fullWidth
                  onClick={() => deletePhoto(photo.imagePath2)}
                >
                  삭제
                </SoftButton>
              )}
            </>
          ) : (
            <span>사진 없음</span>
          ),
          챌린지: photo.challengeTitle,
          날짜: photo.dateUpdated,
          진행여부: photo.proceed,
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching photos", error));
  };

  const deletePhoto = (photoPath) => {
    const deleteConfig = {
      ...baseConfig,
      params: { photoPath },
    };

    axios
      .delete(`${gConst.API_BASE_URL}:8090/user/photo/delete`, deleteConfig)
      .then(() => {
        console.log("Photo deleted successfully");
        fetchPhotos(); // 상태 업데이트를 위해 사진 목록 다시 불러오기
      })
      .catch((error) => {
        console.error("Error deleting photo", error);
      });
  };

  return (
    <SoftBox py={1}>
      <SoftBox mb={1}>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <SoftTypography variant="h5">사진첩</SoftTypography>
        </SoftBox>

        <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <Table columns={columns} rows={rows} />
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
};

export default PhotoList;
