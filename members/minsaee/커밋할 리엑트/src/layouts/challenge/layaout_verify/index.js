// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Images
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";

// Overview page components
import Header from "../components/Header/index";
import SoftInput from "components/SoftInput";

function ChallengeVerify({
  category,
  image,
  title,
  master,
  master_grade,
  total_participants,
  verify_frequency,
  challenge_term,
  action,
}) {
  // 예시
  const challenge = {
    ch_id: "1",
    category: "체지방 감소",
    title: "매일 러닝머신 30분",
    image: require("assets/images/category/category_toloseweight.jpg"),
    master: "뱃살대마왕",
    master_grade: "브론즈",
    total_participants: "3",
    challenge_term: "2주간",
    ch_start_date: "2024-05-01",
    // ch_end_date: "2024-05-15", //ch_start_date + challenge_term 계산식으로 수정
    verify_frequency: "매일",
    verify_times: "일일 1번",
    batting_point: "10000",
    verify_explain: "30분 이상 러닝 기록이 찍힌 러닝머신 화면을 찍어서 올림",
    verify_example1: require("assets/images/category/category_toloseweight.jpg"),
    verify_example2: require("assets/images/category/category_toloseweight.jpg"),
  };

  return (
    <DashboardLayout>
      <Header />
      <Card>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              첫 번째 인증사진을 등록하세요.
            </SoftTypography>
          </SoftBox>
          <SoftInput type="file" placeholder="파일 선택" />
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              두 번째 인증사진을 등록하세요.
            </SoftTypography>
          </SoftBox>
          <SoftInput type="file" placeholder="파일 선택" />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth>
            인증하기
          </SoftButton>
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}

// // Setting default values for the props of ChallengeDetail
// ChallengeDetail.defaultProps = {
//   total_participants: 0,
// };

// // Typechecking props for the ChallengeDetail
// ChallengeDetail.propTypes = {
//   category: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   master: PropTypes.string.isRequired,
//   master_grade: PropTypes.number.isRequired,
//   total_participants: PropTypes.number.isRequired,
//   verify_frequency: PropTypes.string.isRequired,
//   challenge_term: PropTypes.string.isRequired,
//   action: PropTypes.shape({
//     type: PropTypes.oneOf(["joined", "none"]).isRequired,
//     // route: PropTypes.string.isRequired,
//     proceed: PropTypes.oneOf(["rec", "pr", "done"]).isRequired,
//     color: PropTypes.oneOf([
//       "primary",
//       "secondary",
//       "info",
//       "success",
//       "warning",
//       "error",
//       "light",
//       "dark",
//       "white",
//     ]).isRequired,
//     label: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default ChallengeVerify;
