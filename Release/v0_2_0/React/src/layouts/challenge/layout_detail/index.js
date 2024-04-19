import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { challengeActions } from "../toolkit/actions/challenge_actions";

// @mui icons
import InstagramIcon from "@mui/icons-material/Instagram";
import { Card, CardMedia, Grid } from "@mui/material";

// Overview page components
import Socials from "layouts/authentication/components/Socials";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataConverter from "../components/DataConverter";

// Image
import icon_bronze from "assets/images/grade/grade_bronze.png";
import icon_count from "assets/images/icon/count_person.png";
import icon_start from "assets/images/icon/start.png";
import icon_point from "assets/images/icon/point.png";

function ChallengeDetail() {
  const { ch_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const challengeDetail = useSelector(
    (state) => state.challenge.challengeDetail
  );
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

  const [showAlert, setShowAlert] = useState(false);

  // SoftButton 클릭 시 SoftAlert을 보여주는 함수
  const handleJoinButtonClick = () => {
    setShowAlert(true);
  };

  // SoftAlert의 닫기 버튼 클릭 시 SoftAlert을 닫는 함수
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  //TODO localStorage.getItem("userAccount")로 바꾸기
  const localStorageUserID = 81;

  const { image, category, grade, verify_term, period, remainingDays } =
    DataConverter(challengeDetail);

  let buttonComponent;
  let ddayComponent;

  //모집중
  if (challengeDetail.proceed === "rec") {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challengeDetail.ch_id}`}
        variant="outlined"
        size="small"
        color="primary"
      >
        자세히 보기
      </SoftButton>
    );
    ddayComponent = (
      <SoftBox
        bg="rgba(255, 255, 255, 0.8)"
        p={1}
        borderRadius="xl"
        position="absolute"
        bottom="0px"
        left="18px"
        zIndex={3}
        style={{
          color: "#FFFFFF",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textShadow: "0 0 5px #000000",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          src={icon_start}
          component="img"
          sx={{
            maxWidth: "28px",
            height: "auto",
            margin: 0,
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 0,
            position: "relative",
            bottom: "1px",
            right: "8px",
          }}
        />
        D - {remainingDays}
      </SoftBox>
    );
  } else if (challengeDetail.proceed === "pr" && challengeDetail.isJoined) {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/verify/${challenge.ch_id}`}
        variant="outlined"
        size="small"
        color="error"
      >
        인증하기
      </SoftButton>
    );
    ddayComponent = (
      <SoftBox
        bg="rgba(255, 255, 255, 0.8)"
        p={1}
        borderRadius="xl"
        position="absolute"
        bottom="0px"
        left="18px"
        zIndex={3}
        style={{
          color: "#FFFFFF",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textShadow: "0 0 5px #000000",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          src={icon_start}
          component="img"
          sx={{
            maxWidth: "28px",
            height: "auto",
            margin: 0,
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 0,
            position: "relative",
            bottom: "1px",
            right: "8px",
          }}
        />
        진행중
      </SoftBox>
    );
  } else if (challengeDetail.proceed === "pr" && !challengeDetail.isJoined) {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challengeDetail.ch_id}`}
        variant="outlined"
        size="small"
        color="primary"
      >
        자세히 보기
      </SoftButton>
    );
    ddayComponent = (
      <SoftBox
        bg="rgba(255, 255, 255, 0.8)"
        p={1}
        borderRadius="xl"
        position="absolute"
        bottom="0px"
        left="18px"
        zIndex={3}
        style={{
          color: "#FFFFFF",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textShadow: "0 0 5px #000000",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          src={icon_start}
          component="img"
          sx={{
            maxWidth: "28px",
            height: "auto",
            margin: 0,
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 0,
            position: "relative",
            bottom: "1px",
            right: "8px",
          }}
        />
        진행중
      </SoftBox>
    );
  } else {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challengeDetail.ch_id}`}
        variant="outlined"
        size="small"
        color="light"
      >
        참여 종료
      </SoftButton>
    );
    ddayComponent = null;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} pt={2} px={2}>
        <Card
          sx={{
            flexDirection: "column",
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "visible",
            // position: "relative",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "25px",
          }}
        >
          {/* 카테고리 */}
          <SoftBox
            mt={10}
            mb={5}
            position="relative"
            width="400px"
            height="auto"
            shadow="xl"
            borderRadius="xl"
            style={{ zIndex: 1 }}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              margin: 0,
              padding: "5px",
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "contain",
              objectPosition: "center",
              backgroundColor: "#FF3636",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
            }}
          >
            <SoftTypography
              variant="h6"
              fontWeight="bold" // 폰트 굵기 설정
              color="#FFFFFF" // 폰트 색상 설정
            >
              {category}
            </SoftTypography>
          </SoftBox>
          {/* 카테고리 이미지 */}
          <SoftBox
            mt={5}
            mb={3}
            position="relative"
            width="400px"
            height="auto"
            shadow="xl"
            borderRadius="xl"
            sx={{
              bottom: "-17px",
              maxWidth: "100%",
              maxHeight: "100%",
              margin: 0,
              display: "flex",
            }}
          >
            <CardMedia
              src={image}
              component="img"
              sx={{
                maxWidth: "100%",
                height: "auto",
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
                aspectRatio: "16 / 9",
              }}
            />
          </SoftBox>
          {/* 챌린지 제목 */}
          <SoftBox mt={5} mb={3}>
            <SoftTypography variant="h3" align="center" gutterBottom>
              {challengeDetail.title}
            </SoftTypography>
          </SoftBox>
          <SoftBox
            mt={6}
            mb={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50px"
          >
            {/* 인증 주기, 챌린지 기간, 베팅 포인트 */}
            <SoftBox
              width="100%"
              height="100%"
              borderRadius="xl"
              sx={{
                border: "1px solid #999999",
                justifyContent: "center", // 가로 방향 가운데 정렬
                alignItems: "center", // 세로 방향 가운데 정렬
                display: "flex",
                marginRight: "10px",
                textAlign: "center",
              }}
            >
              <SoftTypography variant="h6" fontWeight="bold" color="#FFFFFF">
                {verify_term}
              </SoftTypography>
            </SoftBox>
            <SoftBox
              width="100%"
              height="100%"
              borderRadius="xl"
              sx={{
                border: "1px solid #999999",
                justifyContent: "center", // 가로 방향 가운데 정렬
                alignItems: "center", // 세로 방향 가운데 정렬
                display: "flex",
                textAlign: "center",
              }}
            >
              <SoftTypography variant="h6" fontWeight="bold" color="#FFFFFF">
                {period}
              </SoftTypography>
            </SoftBox>
            <SoftBox
              width="100%"
              height="100%"
              borderRadius="xl"
              sx={{
                border: "1px solid #999999",
                justifyContent: "center", // 가로 방향 가운데 정렬
                alignItems: "center", // 세로 방향 가운데 정렬
                display: "flex",
                marginLeft: "10px",
              }}
            >
              <CardMedia
                src={icon_point}
                component="img"
                sx={{
                  maxWidth: "28px",
                  height: "auto",
                  margin: "0 5px 0 0",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 0,
                  position: "relative",
                }}
              />
              <SoftTypography
                variant="h6"
                fontWeight="bold"
                color="#FFFFFF"
                sx={{ marginRight: "7px" }}
              >
                {challengeDetail.betting_point}
              </SoftTypography>
            </SoftBox>
          </SoftBox>

          {/* Grid : 총 12개열 중 차지하는 열 수로 크기 표시
      xs 모바일 / md 중간 화면 / xl 큰 화면*/}
          <Grid container spacing={3}>
            <SoftBox
              bg="rgba(255, 255, 255, 0.8)"
              p={1}
              borderRadius="xl"
              position="absolute"
              bottom="0px"
              right="20px"
              zIndex={3}
              style={{
                color: "#FFFFFF",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textShadow: "0 0 5px #000000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardMedia
                src={icon_count}
                component="img"
                sx={{
                  maxWidth: "17px",
                  height: "auto",
                  margin: 0,
                  boxShadow: ({ boxShadows: { md } }) => md,
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 0,
                  marginRight: "15px",
                  position: "relative",
                  top: "-3px",
                }}
              />
              {challengeDetail.count}
            </SoftBox>
            {ddayComponent}
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <SoftBox p={3} textAlign="center">
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={6} sm={4}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    챌린지 시작일
                  </SoftTypography>
                  <SoftTypography variant="body1">
                    {challengeDetail.ch_start_date}
                  </SoftTypography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    챌린지 기간
                  </SoftTypography>
                  <SoftTypography variant="body1">
                    {challengeDetail.challenge_term}
                  </SoftTypography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    배팅 포인트
                  </SoftTypography>
                  <SoftTypography variant="body1">
                    {challengeDetail.batting_point}
                  </SoftTypography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    인증 주기
                  </SoftTypography>
                  <SoftTypography variant="body1">
                    {challengeDetail.verify_frequency}
                  </SoftTypography>
                </Grid>
              </Grid>

              <SoftBox mt={6} textAlign="center">
                {localStorageUserID === challengeDetail.user_id ? (
                  <>
                    <Link
                      className="btn btn-primary"
                      to={`/challenge/update/${ch_id}`}
                    >
                      수정
                    </Link>
                    <button className="btn btn-primary" onClick={handleDelete}>
                      삭제
                    </button>
                  </>
                ) : (
                  <>
                    <SoftButton
                      variant="gradient"
                      color="info"
                      onClick={handleJoinButtonClick}
                    >
                      참여하기
                    </SoftButton>
                    {showAlert && (
                      <SoftAlert
                        color="success"
                        dismissible
                        onClose={handleAlertClose}
                      >
                        참여 완료! 챌린지를 끝까지 완수해보세요.
                      </SoftAlert>
                    )}
                  </>
                )}
              </SoftBox>
            </SoftBox>
          </Grid>
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
