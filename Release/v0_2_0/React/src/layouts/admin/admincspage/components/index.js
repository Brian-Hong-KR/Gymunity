import React, { useState, useEffect } from "react";
import axios from "axios";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";

const AdminCsDetail = () => {
  const baseConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const [rows, setRows] = useState([]);

  const columns = [
    { name: "이메일", align: "center" },
    { name: "제목", align: "center" },
    { name: "내용", align: "center" },
    { name: "날짜", align: "center" },
  ];

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = () => {
    axios
      .get(`http://127.0.0.1:8090/user/inquirieslist`, baseConfig)
      .then((response) => {
        const cs = response.data.cs;
        const newRows = cs.map((pointdetail) => ({
          이메일: pointdetail.userEmail,
          제목: pointdetail.title,
          내용: pointdetail.content,
          날짜: pointdetail.inquiryDate,
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching pointdetail", error));
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
          <SoftTypography variant="h5">CS 관리</SoftTypography>
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

export default AdminCsDetail;
