import React, { useState, useEffect } from "react";
import axios from "axios";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";

const PointDetail = () => {
  const baseConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const [rows, setRows] = useState([]);

  const columns = [
    { name: "타입", align: "center" },
    { name: "포인트", align: "center" },
    { name: "이유", align: "center" },
    { name: "날짜", align: "center" },
  ];

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = () => {
    axios
      .get(`/editinfo/pointdetail`, baseConfig)
      .then((response) => {
        const details = response.data.details;
        const newRows = details.map((pointdetail) => ({
          타입: pointdetail.type,
          포인트: pointdetail.points,
          이유: pointdetail.reason,
          날짜: pointdetail.time,
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

export default PointDetail;
