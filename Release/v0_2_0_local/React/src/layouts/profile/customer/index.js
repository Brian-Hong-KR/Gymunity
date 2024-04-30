import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "components/useAuth";
import SoftAlert from "components/SoftAlert";

function CustomerCreate() {
  useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [customer, setCustomer] = useState({
    title: "",
    content: "",
  });

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCustomer((prevState) => ({
      ...prevState,
      title: newTitle,
    }));
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setCustomer((prevState) => ({
      ...prevState,
      content: newContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("제목:", title);
    console.log("내용:", content);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
      },
    };

    console.log("Form submitting", customer);
    try {
      const response = await axios.post("/user/inquiries", customer, config);
      console.log("Registration successful:", response);
      setSuccessMessage("문의가 성공적으로 작성되었습니다.");
      setShowSuccess(true); 
      setTimeout(() => {
        setShowSuccess(false); 
        navigate("/profile");
      }, 700);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={4}>
        <SoftBox mb={2} textAlign="center">
          <SoftTypography variant="h5" fontWeight="bold">고객 문의</SoftTypography>
          <SoftTypography variant="body2" color="text">
            소중한 의견을 남겨주세요. (불편사항, 개선사항, 비지니스 문의 등)
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <Card>
        <SoftBox component="form" role="form" pt={2} pb={3} px={3}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
                제목
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              placeholder="제목"
              name="title"
              value={customer.title}
              onChange={handleTitleChange}
            />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="h7"
                fontWeight="bold"
              >
                문의 내용
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="title"
              name="content"
              placeholder="문의 내용을 입력해주세요."
              value={customer.content}
              onChange={handleContentChange}
              multiline
              rows={10} // 원하는 높이로 조정 가능
              fullWidth
              sx={{ width: "100%" }} // 가로폭을 최대로 확보합니다.
            />
          </SoftBox>

          {successMessage && (
                    <SoftBox
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <SoftAlert color="success">{successMessage}</SoftAlert>
                    </SoftBox>
          )}
          <SoftBox mt={4} mb={1}>
            <SoftButton
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
              onClick={handleSubmit}
              style={{ fontSize: '15px' }} 
            >
              문의 완료
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}
export default CustomerCreate;
