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
      {/* Grid : 총 12개열 중 차지하는 열 수로 크기 표시
      xs 모바일 / md 중간 화면 / xl 큰 화면*/}
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid xs={12} md={12} xl={8}>
          <Grid item py={3} pt={2} px={2}>
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
                padding: "20px",
              }}
            >
              <SoftBox
                pt={1}
                pb={5}
                maxWidth="500px"
                width="100%"
                height="auto"
                justifyContent="center"
              >
                {/* 카테고리 */}
                <SoftBox
                  mb={5}
                  position="relative"
                  maxWidth="400px"
                  width="100%"
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
                  maxWidth="400px"
                  width="100%"
                  height="auto"
                  shadow="xl"
                  borderRadius="xl"
                  sx={{
                    bottom: "-17px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
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
                <SoftBox mt={5} maxWidth="500px" width="100%" height="auto">
                  <SoftTypography variant="h3" align="center" gutterBottom>
                    {challengeDetail.title}
                  </SoftTypography>
                </SoftBox>
                {/* 인증 주기, 챌린지 기간, 베팅 포인트 */}
                <SoftBox
                  spacing={3}
                  mt={1}
                  mb={3}
                  maxWidth="500px"
                  width="100%"
                  height="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* 인증주기 */}
                  <SoftBox
                    width="100%"
                    height="100%"
                    sx={{
                      justifyContent: "center", // 가로 방향 가운데 정렬
                      textAlign: "center",
                      flexDirection: "column",
                      marginRight: "10px",
                    }}
                  >
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      인증 주기
                    </SoftTypography>
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
                      <SoftTypography
                        variant="h6"
                        fontWeight="bold"
                        color="#FFFFFF"
                      >
                        {verify_term}
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  {/* 챌린지 기간 */}
                  <SoftBox
                    width="100%"
                    height="100%"
                    sx={{
                      justifyContent: "center", // 가로 방향 가운데 정렬
                      textAlign: "center",
                      flexDirection: "column",
                    }}
                  >
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      챌린지 기간
                    </SoftTypography>
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
                      <SoftTypography
                        variant="h6"
                        fontWeight="bold"
                        color="#FFFFFF"
                      >
                        {period}
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  {/* 베팅 포인트 */}
                  <SoftBox
                    width="100%"
                    height="100%"
                    sx={{
                      justifyContent: "center", // 가로 방향 가운데 정렬
                      textAlign: "center",
                      flexDirection: "column",
                    }}
                  >
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      sx={{ paddingLeft: "10px", justifyContent: "center" }}
                    >
                      베팅 포인트
                    </SoftTypography>
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
                </SoftBox>

                <SoftBox
                  mt={7}
                  mb={2}
                  width="100%"
                  height="100%"
                  sx={{
                    justifyContent: "center", // 가로 방향 가운데 정렬
                    textAlign: "center",
                    display: "flex",
                  }}
                >
                  <CardMedia
                    src={icon_point}
                    component="img"
                    sx={{
                      maxWidth: "33px",
                      height: "auto",
                      margin: "0 5px 0 0",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 0,
                      position: "relative",
                      marginRight: "10px",
                    }}
                  />
                  <SoftTypography variant="body1">
                    {challengeDetail.ch_start_date}
                    {" ~ "}
                    {challengeDetail.ch_start_date}
                  </SoftTypography>
                </SoftBox>
                <hr style={{ width: "100%", border: "1px solid #999999" }} />
                <SoftBox mt={3} mb={3} mx={5}>
                  <SoftTypography
                    variant="h5"
                    fontWeight="bold"
                    color="#FFFFFF"
                  >
                    챌린지 완료 보상
                  </SoftTypography>
                  <SoftTypography
                    variant="h6"
                    // fontWeight="bold"
                    color="#FFFFFF"
                    sx={{ marginTop: "10px" }}
                  >
                    {`100% 완료 시 1억`}
                    <br />
                    {`80% 완료 시 5000만원`}
                    <br />
                    {`50% 완료 시 100원`}
                    <br />
                    {`그 이하는 더 노력하세요.`}
                    <br />
                  </SoftTypography>
                </SoftBox>
                <hr style={{ width: "100%", border: "1px solid #999999" }} />
                <SoftBox mt={3} mb={3} mx={5}>
                  <SoftTypography
                    variant="h5"
                    fontWeight="bold"
                    color="#FFFFFF"
                  >
                    챌린지 소개
                  </SoftTypography>
                  <SoftTypography
                    variant="h6"
                    // fontWeight="bold"
                    color="#FFFFFF"
                    sx={{ marginTop: "10px" }}
                  >
                    {challengeDetail.content}
                  </SoftTypography>
                </SoftBox>

                <SoftBox
                  mt={3}
                  mb={3}
                  mx={5}
                  position="relative"
                  maxWidth="400px"
                  width="100%"
                  height="auto"
                  shadow="xl"
                  sx={{
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    padding: "10px",
                    bottom: "-17px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    margin: 0,
                    display: "flex",
                    // justifyContent: "center",
                    padding: "25px",
                  }}
                >
                  <SoftTypography
                    variant="h5"
                    fontWeight="bold"
                    color="#FFFFFF"
                  >
                    Master
                  </SoftTypography>
                  <CardMedia
                    src={grade}
                    component="img"
                    sx={{
                      maxWidth: "20px",
                      height: "auto",
                      margin: 0,
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 0,
                      marginRight: "8px",
                      marginLeft: "10px",
                      position: "relative",
                      top: "0px",
                    }}
                  />
                  <SoftTypography
                    variant="h6"
                    fontWeight="regular"
                    textTransform="capitalize"
                    textGradient
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {challengeDetail.nick_name}
                  </SoftTypography>
                  <SoftTypography
                    variant="h6"
                    // fontWeight="bold"
                    color="#FFFFFF"
                    sx={{ marginTop: "10px" }}
                  >
                    sksksk
                  </SoftTypography>
                </SoftBox>

                <SoftBox mt={6} textAlign="center">
                  {localStorageUserID === challengeDetail.user_id ? (
                    <>
                      <Link
                        className="btn btn-primary"
                        to={`/challenge/update/${ch_id}`}
                      >
                        수정
                      </Link>
                      <button
                        className="btn btn-primary"
                        onClick={handleDelete}
                      >
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
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}


export default ChallengeDetail;
