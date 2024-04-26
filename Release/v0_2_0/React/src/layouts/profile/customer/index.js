// react-router-dom components
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useNavigate, useLocation } from "react-router-dom";

import axios from 'axios';
import { gConst } from 'layouts/gConst';

function CustomerCreate(){
     const [title, setTitle] = useState("");
     const [content, setContent] = useState("");
     const navigate = useNavigate();

     const [customer, setCustomer] = useState({
        title : "",
        content : "",
     });

     const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setCustomer(prevState => ({
            ...prevState,
            title: newTitle
        }));
    };
    
    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setCustomer(prevState => ({
            ...prevState,
            content: newContent
        }));
    };

    const handleSubmit =  async (e)  => {
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
            const response = await axios.post(`${gConst.API_BASE_URL}:8090/user/inquiries`, customer, config);
            console.log("Registration successful:", response);
            alert('문의가 성공적으로 작성되었습니다.');
            navigate("/profile");
          } catch (error) {
            
            
              console.error("Registration failed:", error);
            
          }
        
    };

    return (
        <DashboardLayout>
            <DashboardNavbar/>

                <SoftBox py={3}>
                  <SoftBox mb={3}>
                      <SoftTypography variant="h5">고객 문의</SoftTypography>
                      <SoftTypography variant="body2" color="text">
                        소중한 의견을 남겨주세요. (불편사항, 개선사항, 비지니스 문의 등)
                      </SoftTypography>
                    </SoftBox>
                </SoftBox>

            <Card>
                <SoftBox component="form" role="form" pt={2} pb={3} px={3}>

                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        제목
                    </SoftTypography>
                    </SoftBox>
                    <SoftInput type="title" 
                    placeholder="제목" 
                    name = "title"
                    value = {customer.title}
                    onChange = {handleTitleChange}
                    />
                </SoftBox>

                
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        문의 내용
                    </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="title"
                        name="content"
                        placeholder="문의 내용을 입력해주세요."
                        value = {customer.content}
                        onChange = {handleContentChange}
                        multiline
                        rows={10} // 원하는 높이로 조정 가능
                        fullWidth
                        sx={{ width: '100%' }} // 가로폭을 최대로 확보합니다.
                    />
                </SoftBox>

                <SoftBox mt={4} mb={1}>
                    <SoftButton type = "submit" 
                                variant="gradient" 
                                color="dark"
                                fullWidth 
                                onClick = {handleSubmit}
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
