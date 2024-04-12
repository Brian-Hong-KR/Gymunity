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

// Images
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";

function ChallengeDetail({
  category,
  image,
  title,
  master,
  master_grade,
  total_participants,
  cetify_frequency,
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
    cetify_frequency: "매일",
    cetify_times: "일일 1번",
    batting_point: "10000",
    cetify_explain: "30분 이상 러닝 기록이 찍힌 러닝머신 화면을 찍어서 올림",
    cetify_example1: require("assets/images/category/category_toloseweight.jpg"),
    cetify_example2: require("assets/images/category/category_toloseweight.jpg"),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <SoftBox>
            <Grid display="flex" alignItems="center" container spacing={3}>
              <img src={challenge.image} alt="category" />
            </Grid>
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
                    {challenge.cetify_frequency}
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
                    {challenge.cetify_times}
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
                    {challenge.cetify_explain}
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
                    <img src={challenge.cetify_example1} alt="category" />
                  </Grid>
                  <Grid display="flex" alignItems="center" container spacing={3}>
                    <img src={challenge.cetify_example1} alt="category" />
                  </Grid>
                </SoftBox>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth>
                  참여하기
                </SoftButton>
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
  cetify_frequency: PropTypes.string.isRequired,
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
