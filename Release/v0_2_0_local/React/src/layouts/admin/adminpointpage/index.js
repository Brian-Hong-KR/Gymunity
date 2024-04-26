import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Table from "examples/Tables/Table";
import typography from "assets/theme/base/typography";

const AdminPointPage = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const [userAccountId, setUserAccountId] = useState("");
  const [pointsHistory, setPointsHistory] = useState([]);
  const [rows, setRows] = useState([]);
  const { size, fontWeightBold } = typography;

  const [reason, setReason] = useState("");
  const [pointAdjust, setPointAdjust] = useState(0);

  const columns = [
    { name: "이유", align: "center" },
    { name: "포인트", align: "center" },
    { name: "날짜", align: "center" },
  ];

  const handleUserAccountIdChange = (event) => {
    setUserAccountId(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handlePointAdjustChange = (event) => {
    setPointAdjust(parseInt(event.target.value));
  };

  const getPointsHistoryByAccountId = async () => {
    try {
      const response = await axios.get(
        `/admin/points/history/${userAccountId}`,
        config
      );
      console.log("Received data:", response.data);
      const formattedRows = response.data.details.map((item) => ({
        이유: item.reason,
        포인트: (
          <span
            style={{
              color: item.points >= 0 ? "blue" : "red",
              fontWeight: "bold",
            }}
          >
            {item.points}
          </span>
        ),
        날짜: item.time,
      }));
      setPointsHistory(response.data);
      setRows(formattedRows);
      console.log("Received data:", response.data);
    } catch (error) {
      console.error("Error fetching points history:", error);
    }
  };

  // const adjustPoints = async () => {
  //   try {
  //     await axios.post("/admin/points/adjustPoints", {
  //       pointsAdjusted: pointAdjust,
  //       reason: reason,
  //       userId: userId,
  //     });
  //     // After adjusting points, fetch the updated points history
  //     getPointsHistoryByUserID();
  //   } catch (error) {
  //     console.error("Error adjusting points:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (userId !== null) {
  //     getPointsHistoryByUserID();
  //   }
  // }, [userId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox mb={2} style={{ display: "flex", alignItems: "center" }}>
            <SoftTypography
              component="label"
              fontWeight="bold"
              style={{ width: "30%" }}
            >
              ID:
            </SoftTypography>

            <SoftInput
              type="text"
              value={userAccountId}
              onChange={handleUserAccountIdChange}
              style={{ width: "30%" }}
              placeholder="Enter User Account ID"
            />

            <SoftButton
              color="dark"
              onClick={getPointsHistoryByAccountId}
              style={{ width: "30%" }}
            >
              Point List
            </SoftButton>
          </SoftBox>

          {rows.length > 0 && (
            <>
              <SoftBox pt={2} pb={3} px={3}>
                <SoftBox
                  mb={2}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <SoftTypography component="label" fontWeight="bold">
                    Point:
                  </SoftTypography>
                  <SoftInput
                    type="number"
                    value={pointAdjust}
                    // onChange={handlePointAdjustChange}
                  />
                  <SoftTypography component="label" fontWeight="bold">
                    Reason:
                  </SoftTypography>
                  <SoftInput
                    type="text"
                    value={reason}
                    // onChange={handleReasonChange}
                  />
                </SoftBox>
              </SoftBox>
              <SoftBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({
                        borders: { borderWidth, borderColor },
                      }) => `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={columns} rows={rows} />
              </SoftBox>
            </>
          )}
        </SoftBox>

        {/* {userId !== null && (
          <div>
            <SoftBox pt={2} pb={3} px={3}>
              <SoftBox mb={2} style={{ display: "flex", alignItems: "center" }}>
                <SoftTypography component="label" fontWeight="bold">
                  Point:
                </SoftTypography>
                <SoftInput
                  type="number"
                  value={pointAdjust}
                  onChange={handlePointAdjustChange}
                />
                <SoftTypography component="label" fontWeight="bold">
                  Reason:
                </SoftTypography>
                <SoftInput
                  type="text"
                  value={reason}
                  onChange={handleReasonChange}
                />
              </SoftBox>
            </SoftBox>

            <SoftButton color="dark" onClick={adjustPoints} fullWidth>
              Adjust Points
            </SoftButton>
            <SoftBox
              pt={2}
              pb={3}
              px={3}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Table columns={columns} rows={rows} />
              {pointsHistory.map((entry, index) => (
                <SoftBox
                  mb={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  key={index}
                  fontSize={size.xs}
                >
                  <td style={{ marginRight: "auto" }}>{entry.reason}</td>
                  <td style={{ marginRight: "auto" }}>{entry.points}</td>
                  <td style={{ marginRight: "auto" }}>{entry.time}</td>
                </SoftBox>
              ))}
            </SoftBox>
          </div>
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default AdminPointPage;
