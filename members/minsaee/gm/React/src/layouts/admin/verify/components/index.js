import React, { useState, useEffect } from "react";
import axios from "axios";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";

const AdminVerify = () => {
  const baseConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const [rows, setRows] = useState([]);

  const columns = [
    { name: "인덱스", align: "center" },
    { name: "사진1", align: "center" },
    { name: "사진2", align: "center" },
    { name: "인증확인", align: "center" },
    { name: "챌린지", align: "center" },
    { name: "진행여부", align: "center" },
    { name: "날짜", align: "left" },
  ];

  useEffect(() => {
    fetchVerify();
  }, []);

  const fetchVerify = () => {
    axios
      .get(`/admin/verify/list`, baseConfig)
      .then((response) => {
        console.log(response.data);
        const newRows = response.data.map((verifyList) => ({
          인덱스: verifyList.viId,
          사진1: verifyList.imagePath1 ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/${verifyList.imagePath1}`}
                alt="User Photo 1"
                style={{ width: "50%", height: "auto" }}
              />
              {verifyList.proceed === "rec" && (
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  fullWidth
                  onClick={() => deletePhoto(verifyList.imagePath1)}
                >
                  삭제
                </SoftButton>
              )}
            </>
          ) : (
            <span>사진 없음</span>
          ),
          사진2: verifyList.imagePath2 ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/${verifyList.imagePath2}`}
                alt="User Photo 2"
                style={{ width: "50%", height: "auto" }}
              />
              {verifyList.proceed === "rec" && (
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  fullWidth
                  onClick={() => deletePhoto(verifyList.imagePath2)}
                >
                  삭제
                </SoftButton>
              )}
            </>
          ) : (
            <span>사진 없음</span>
          ),
          인증확인: (
            <>
              <SoftButton
                type="button"
                variant="gradient"
                color="info"
                onClick={() => handleVerifyStatusChange(verifyList.viId, "Y")}
              >
                인증 성공
              </SoftButton>
              <SoftButton
                type="button"
                variant="gradient"
                color="warning"
                onClick={() => handleVerifyStatusChange(verifyList.viId, "F")}
              >
                인증 실패
              </SoftButton>
            </>
          ),
          챌린지: verifyList.challengeTitle,
          날짜: verifyList.dateUpdated,
          진행여부: verifyList.proceed,
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching photos", error));
  };

  const handleVerifyStatusChange = (viId, result) => {
    axios
      .put("/admin/verify/check", { viId, result }, baseConfig)
      .then((response) => {
        console.log("Status updated:", response.data);
        fetchVerify(); // 성공하면 목록을 다시 불러옵니다.
      })
      .catch((error) => {
        console.error("Error updating verification status", error);
      });
  };

  const deletePhoto = (photoPath) => {
    const deleteConfig = {
      ...baseConfig,
      params: { photoPath },
    };

    axios
      .delete(`/user/photo/delete`, deleteConfig)
      .then(() => {
        console.log("Photo deleted successfully");
        fetchVerify(); // 상태 업데이트를 위해 사진 목록 다시 불러오기
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
          <SoftTypography variant="h5">포인트 내역</SoftTypography>
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

export default AdminVerify;
