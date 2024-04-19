// React에서 백엔드 API 호출하고 사진 데이터 표시하는 코드

import React, { useState, useEffect } from "react";
import axios from "axios";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import data from "../data/photoData";
import Table from "examples/Tables/Table";

const PhotoList = () => {
  const { columns, rows } = data();

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
