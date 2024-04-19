// React에서 백엔드 API 호출하고 사진 데이터 표시하는 코드

import React, { useState, useEffect } from "react";
import axios from "axios";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";

const PhotoList = () => {
  const config = {
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
    { name: "날짜", align: "left" },
  ];

  useEffect(() => {
    // 이미지 정보를 불러오는 API 호출
    axios
      .get(`/photo`, config)
      .then((response) => {
        // 받아온 데이터로 rows 상태 업데이트
        setRows(
          response.data.map((photo) => ({
            사진1: (
              <img
                src={`${process.env.PUBLIC_URL}/${photo.imagePath1}`}
                alt="User Photo 1"
                style={{ width: "50%", height: "auto" }}
              />
            ),
            사진2: photo.imagePath2 ? (
              <img
                src={`${process.env.PUBLIC_URL}/${photo.imagePath2}`}
                alt="User Photo 2"
                style={{ width: "50%", height: "auto" }}
              />
            ) : (
              <span>No additional photo</span>
            ),
            챌린지: photo.challengeTitle,
            날짜: photo.dateUpdated,
          }))
        );
      })
      .catch((error) => console.error("Error fetching photos", error));
  }, []);

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
