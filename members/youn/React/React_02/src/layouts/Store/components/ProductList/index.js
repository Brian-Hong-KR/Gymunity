import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

// Data
import data from "layouts/Store/Data/productData";

function ProductList() {

  const { columns, rows } = data();

  return (
    <SoftBox py={1}>
        <SoftBox mb={1}>

            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">맞춤 건강 상품</SoftTypography>
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
}

export default ProductList;
