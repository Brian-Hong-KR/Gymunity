import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useCallback, useState } from "react";
import axios from "axios";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Table from "examples/Tables/Table";
import typography from "assets/theme/base/typography";
import { debounce } from "@mui/material";
import { gConst } from "layouts/gConst";

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

  const handleUserAccountIdChange = useCallback((event) => {
    setUserAccountId(event.target.value);
  }, []);

  const handlePointAdjustChange = useCallback((event) => {
    setPointAdjust(event.target.value);
  }, []);

  const handleReasonChange = useCallback((event) => {
    setReason(event.target.value);
  }, []);

  const getPointsHistoryByAccountId = async () => {
    try {
      const response = await axios.get(
        `${gConst.API_BASE_URL}:8090/admin/points/history/${userAccountId}`,
        config
      );
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
    } catch (error) {
      console.error("Error fetching points history:", error);
      if (error.response) {
        console.log("HTTP status code:", error.response.status);
        alert("접근 권한이 없습니다."); // 일관된 메시지를 위해 경고를 통일
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다.");
          navigate("/profile");
        } else {
          alert("접근 권한이 없습니다.");
          navigate("/main");
        }
      } else {
        alert("접근 권한이 없습니다.");
        navigate("/main"); // 응답이 없는 경우, /main으로 리다이렉트
      }
    }
  };

  const adjustPoints = async () => {
    try {
      await axios.post(
        `${gConst.API_BASE_URL}:8090/admin/points/adjust`,
        {
          userAccountId,
          pointsAdjusted: pointAdjust,
          reason,
        },
        config
      );
      setPointAdjust(0);
      setReason("");
      getPointsHistoryByAccountId();
    } catch (error) {
      console.error("Error adjustPoints:", error);
      if (error.response) {
        console.log("HTTP status code:", error.response.status);
        alert("접근 권한이 없습니다."); // 일관된 메시지를 위해 경고를 통일
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다.");
          navigate("/profile");
        } else {
          alert("서버 오류가 발생했습니다.");
          navigate("/main");
        }
      } else {
        alert("네트워크 오류가 발생했습니다.");
        navigate("/main"); // 응답이 없는 경우, /main으로 리다이렉트
      }
    }
  };

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
                  <SoftButton color="dark" onClick={adjustPoints} fullWidth>
                    Adjust Points
                  </SoftButton>
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
      </div>
    </DashboardLayout>
  );
};

export default AdminPointPage;
