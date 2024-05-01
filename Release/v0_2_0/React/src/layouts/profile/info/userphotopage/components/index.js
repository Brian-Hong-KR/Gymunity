import React, { useState, useEffect } from "react";
import axios from "axios";
import { gConst } from "layouts/gConst";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";
import useAuth from "components/useAuth";

const PhotoList = () => {
  useAuth();
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
        const newRows = response.data.map((photo) => ({
          사진1: photo.imagePath1 ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/${photo.imagePath1}`}
                alt="User Photo 1"
                style={imgStyle}
              />
              {photo.proceed === "pr" && (
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
              {photo.proceed === "pr" && (
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
        // 'proceed' 값에 따라 정렬
        newRows.sort((a, b) => {
          if (a.진행여부 === "pr" && b.진행여부 === "done") {
            return -1; // 'pr'을 'done'보다 아래에 위치
          } else if (a.진행여부 === "done" && b.진행여부 === "pr") {
            return 1; // 'done'을 'pr'보다 위에 위치
          } else {
            return 0; // 같은 경우는 순서 유지
          }
        });
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
        ></SoftBox>

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
