import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { challengeActions } from "../toolkit/actions/challenge_actions";

// @mui icons
import InstagramIcon from "@mui/icons-material/Instagram";
import { Card, Grid } from "@mui/material";

// Overview page components
import Header from "./../components/Header/index";
import Socials from "layouts/authentication/components/Socials";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import Footer from "examples/Footer";

function ChallengeDetail() {
  const { ch_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const challengeDetail = useSelector((state) => state.challenge.challengeDetail);
  const pv = useSelector((state) => state.challenge.pv);

  // const config = {
  //   headers: {
  //     Authorization: localStorage.getItem("Authorization"),
  //     "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
  //   },

  //삭제버튼
  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(challengeActions.getChallengeDelete(ch_id));
    navigate(`/challenge/list/${pv.currentPage}`);
  };

  useEffect(() => {
    dispatch(challengeActions.getChallengeDetail(ch_id));
  }, []);

  const [showAlert, setShowAlert] = useState(false); // SoftAlert의 표시 여부를 관리할 상태

  // SoftButton 클릭 시 SoftAlert을 보여주는 함수
  const handleJoinButtonClick = () => {
    setShowAlert(true); // showAlert 상태를 true로 변경하여 SoftAlert을 보이도록 설정
  };

  // SoftAlert의 닫기 버튼 클릭 시 SoftAlert을 닫는 함수
  const handleAlertClose = () => {
    setShowAlert(false); // showAlert 상태를 false로 변경하여 SoftAlert을 숨기도록 설정
  };

  //TODO localStorage.getItem("userAccount")로 바꾸기
  const localStorageUserID = 81;

  return (
    <DashboardLayout>
      <Header />
      <SoftBox py={3}>
        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h3" align="center" gutterBottom>
              {challengeDetail.title}
            </SoftTypography>
          </SoftBox>

          <SoftBox p={3} textAlign="center">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} sm={4}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  챌린지 유형
                </SoftTypography>
                <SoftTypography variant="body1">{challengeDetail.category}</SoftTypography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  챌린지 시작일
                </SoftTypography>
                <SoftTypography variant="body1">{challengeDetail.ch_start_date}</SoftTypography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  챌린지 기간
                </SoftTypography>
                <SoftTypography variant="body1">{challengeDetail.challenge_term}</SoftTypography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  배팅 포인트
                </SoftTypography>
                <SoftTypography variant="body1">{challengeDetail.batting_point}</SoftTypography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  인증 빈도
                </SoftTypography>
                <SoftTypography variant="body1">{challengeDetail.verify_frequency}</SoftTypography>
              </Grid>
            </Grid>

            <SoftBox mt={6} textAlign="center">
              {localStorageUserID === challengeDetail.user_id ? (
                <>
                  <Link className="btn btn-primary" to={`/challenge/update/${ch_id}`}>
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
      <Footer />
    </DashboardLayout>
  );
}

// Setting default values for the props of ChallengeDetail
ChallengeDetail.defaultProps = {
  total_participants: 0,
};

// Typechecking props for the ChallengeDetail
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

export default ChallengeDetail;
