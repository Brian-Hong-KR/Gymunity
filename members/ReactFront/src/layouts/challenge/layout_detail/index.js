import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

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
import Header from "./../components/Header/index";
import Socials from "layouts/authentication/components/Socials";

function ChallengeDetail({
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
    // TODO ch_end_date: "2024-05-15", //ch_start_date + challenge_term 계산식으로 수정
    verify_frequency: "매일",
    verify_times: "일일 1번",
    batting_point: "10000",
    verify_explain: "30분 이상 러닝 기록이 찍힌 러닝머신 화면을 찍어서 올림",
    verify_example1: require("assets/images/category/category_toloseweight.jpg"),
    verify_example2: require("assets/images/category/category_toloseweight.jpg"),
  };

  const [showAlert, setShowAlert] = useState(false); // SoftAlert의 표시 여부를 관리할 상태

  // SoftButton 클릭 시 SoftAlert을 보여주는 함수
  const handleJoinButtonClick = () => {
    setShowAlert(true); // showAlert 상태를 true로 변경하여 SoftAlert을 보이도록 설정
  };

  // SoftAlert의 닫기 버튼 클릭 시 SoftAlert을 닫는 함수
  const handleAlertClose = () => {
    setShowAlert(false); // showAlert 상태를 false로 변경하여 SoftAlert을 숨기도록 설정
  };

  return (
    <DashboardLayout>
      <Header />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <SoftBox>
            <Grid display="flex" alignItems="center" container spacing={3}>
              <img src={challenge.image} alt="category" />
            </Grid>
          </SoftBox>
          <SoftBox>
            <SoftTypography variant="h3">공유하기</SoftTypography>
            <Socials />
          </SoftBox>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h3">{challenge.title}</SoftTypography>
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
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    챌린지 유형
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.category}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    챌린지 시작일
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.ch_start_date}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    챌린지 기간
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.challenge_term}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    예치 포인트
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.batting_point}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    인증 빈도
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.verify_frequency}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    인증 횟수
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.verify_times}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    인증 방법
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    {challenge.verify_explain}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    인증 예시
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} ml={0.5}>
                  <Grid display="flex" alignItems="center" container spacing={3}>
                    <img src={challenge.verify_example1} alt="category" />
                  </Grid>
                  <Grid display="flex" alignItems="center" container spacing={3}>
                    <img src={challenge.verify_example1} alt="category" />
                  </Grid>
                </SoftBox>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                {localStorage.getItem("userId") === challengeDetail.master_id ? (
                  <>
                    <Link className="btn btn-primary" to={`/board/update/${num}`}>
                      수정
                    </Link>
                    <button className="btn btn-primary" onClick={handleDelete}>
                      삭제
                    </button>
                  </>
                ) : (
                  <>
                    <SoftButton variant="gradient" color="info" onClick={handleJoinButtonClick}>
                      참여하기
                    </SoftButton>
                    {showAlert && (
                      <SoftAlert color="success" dismissible onClose={handleAlertClose}>
                        참여 완료! 챌린지를 끝까지 완수해보세요.
                      </SoftAlert>
                    )}
                  </>
                )}
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

// Setting default values for the props of ChallengeDetail
ChallengeDetail.defaultProps = {
  total_participants: 0,
};

// Typechecking props for the ChallengeDetail
ChallengeDetail.propTypes = {
  category: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  master: PropTypes.string.isRequired,
  master_grade: PropTypes.number.isRequired,
  total_participants: PropTypes.number.isRequired,
  verify_frequency: PropTypes.string.isRequired,
  challenge_term: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["joined", "none"]).isRequired,
    // route: PropTypes.string.isRequired,
    proceed: PropTypes.oneOf(["rec", "pr", "done"]).isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChallengeDetail;
