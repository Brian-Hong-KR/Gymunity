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
  const { chId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const challengeDetail = useSelector(
    (state) => state.challenge.challengeDetail
  );
  const pv = useSelector((state) => state.challenge.pv);

  const joinList = useSelector((state) => state.challenge.joinList || []);
  // console.log("joinList:", joinList);

  const joinChIdList =
    joinList.length > 0 && typeof joinList[0] === "object"
      ? Object.values(joinList[0])
      : [];
  console.log("joinChIdList:", joinChIdList);

  const isJoined =
    challengeDetail.chId === joinChIdList[0] ||
    challengeDetail.chId === joinChIdList[1]
      ? true
      : false;

  // console.log("challengeDetail.chId:", challengeDetail.chId);
  // console.log("challengeDetail.isJoined:", isJoined);

  const localUserId = parseInt(localStorage.getItem("userId"));
  // console.log("localUserId:", localUserId);
  // console.log("register_UserId:", challengeDetail.userId);

  const { image, category, grade, verifyTerm, remainingDays } =
    DataConverter(challengeDetail);
  const [currentPage, setCurrentPage] = useState(1); // currentPage 상태 추가

  useEffect(() => {
    dispatch(challengeActions.getChallengeDetail(chId));
  }, [chId, dispatch]);

  // 알림창 관리
  const [showJoinAlert, setShowJoinAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const AlertComponent = ({ message, color, onClose }) => (
    <SoftAlert color={color} dismissible onClose={onClose}>
      {message}
    </SoftAlert>
  );

  // 알림창 닫기 함수
  const handleAlertClose = () => {
    setShowJoinAlert(false);
    setShowDeleteAlert(false);
    navigate(`/challenge/list/${currentPage}`);
  };

  // 삭제하기 함수
  const handleDeleteButtonClick = async () => {
    try {
      const response = await dispatch(
        challengeActions.getChallengeDelete(chId)
      );
      console.error("삭제 chId:", chId);
      if (response.payload === "삭제 실패") {
        setDeleteMessage("다른 참여자가 있을 경우 삭제가 불가합니다.");
        setShowDeleteAlert(true);
      } else {
        setDeleteMessage("챌린지가 삭제되었습니다.");
        setShowDeleteAlert(true);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      setDeleteMessage("삭제 요청 중 오류가 발생했습니다.");
      setShowDeleteAlert(true);
    }
  };

  // 참여하기 함수
  const handleJoinButtonClick = async (e) => {
    e.preventDefault();
    await dispatch(challengeActions.getChallengeJoin(chId));
    // SoftButton 클릭 시 SoftAlert을 보여주는 함수
    setShowJoinAlert(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
          maxWidth="350px"
          width="100%"
          height="auto"
          justifyContent="center"
        >
          {/* 카테고리 */}
          <SoftBox
            mb={5}
            position="relative"
            maxWidth="350px"
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
              backgroundColor: "rgba(189, 189, 189, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SoftTypography
              variant="h6"
              fontWeight="bold" // 폰트 굵기 설정
            >
              {category}
            </SoftTypography>
          </SoftBox>
          {/* 카테고리 이미지 */}
          <SoftBox
            mt={5}
            mb={3}
            position="relative"
            maxWidth="350px"
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
            <SoftBox // dday + count
              position="absolute"
              minWidth="350px"
              width="100%"
              height="30px"
              bottom="70px"
              style={{
                zIndex: 5,
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SoftBox //dday
                position="absolute"
                minWidth="350px"
                width="100%"
                height="30px"
                left="8px"
                bottom="-64px"
                color="#FFFFFF"
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  textShadow: "0 0 4px #000000",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 5,
                  flexDirection: "row",
                }}
              >
                {challengeDetail.proceed === "done" ? (
                  <SoftBox>
                    <SoftTypography
                      color="#FFFFFF"
                      sx={{
                        fontSize: "1.7rem",
                      }}
                    >
                      Finished
                    </SoftTypography>
                  </SoftBox>
                ) : (
                  <>
                    <CardMedia
                      src={icon_start}
                      component="img"
                      sx={{
                        maxWidth: "25px",
                        height: "auto",
                        objectFit: "cover",
                        objectPosition: "center",
                        position: "relative",
                        bottom: "10px",
                        right: "8px",
                        marginRight: "3px",
                        zIndex: 5,
                      }}
                    />

                    {challengeDetail.proceed === "rec" ? (
                      <>D - {remainingDays}</>
                    ) : (
                      "진행중"
                    )}
                  </>
                )}
              </SoftBox>
              <SoftBox
                position="absolute"
                width="100%"
                height="30px"
                bottom="-62px"
                color="#FFFFFF"
                right="-290px"
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  textShadow: "0 0 4px #000000",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 5,
                  flexDirection: "row",
                }}
              >
                <CardMedia
                  src={icon_count}
                  component="img"
                  sx={{
                    maxWidth: "20px",
                    height: "auto",
                    margin: 0,
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 0,
                    position: "relative",
                    bottom: "2px",
                    right: "13px",
                    zIndex: 5,
                  }}
                />
                {challengeDetail.count}
              </SoftBox>
            </SoftBox>
          </SoftBox>
          {/* 챌린지 제목 */}
          <SoftBox mt={5} maxWidth="500px" width="100%" height="auto">
            <SoftTypography variant="h4" align="center" gutterBottom>
              {challengeDetail.title}
            </SoftTypography>
          </SoftBox>
          {/* 인증 주기, 챌린지 기간, 베팅 포인트 */}
          <SoftBox
            spacing={3}
            mt={1}
            mb={3}
            maxWidth="350px"
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
                <SoftTypography variant="h6" fontWeight="bold" color="#FFFFFF">
                  {verifyTerm}
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
                <SoftTypography variant="h6" fontWeight="bold" color="#FFFFFF">
                  {ChallengeDetail.challengePeriod}주간
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
                  {challengeDetail.bettingPoint}
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>

          <SoftBox //챌린지 기간 (달력 날짜)
            mt={7}
            mb={1}
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
                top: "-3px",
              }}
            />
            <SoftTypography variant="body2">
              {challengeDetail.chStartDate}
              {" ~ "}
              {challengeDetail.chEndDate}
            </SoftTypography>
          </SoftBox>
          <hr style={{ width: "100%", border: "1px solid #999999" }} />
          <SoftBox mt={3} mb={3} mx={5}>
            <SoftTypography variant="h6" color="#FFFFFF" fontWeight="bold">
              챌린지 완료 보상
            </SoftTypography>
            <SoftTypography
              variant="h6"
              // fontWeight="bold"
              color="#FFFFFF"
              sx={{ marginTop: "10px", fontSize: "0.9rem" }}
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
            <SoftTypography variant="h6" fontWeight="bold" color="#FFFFFF">
              챌린지 소개
            </SoftTypography>
            <SoftTypography
              variant="h6"
              // fontWeight="bold"
              color="#FFFFFF"
              sx={{ marginTop: "10px", fontSize: "0.9rem" }}
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
              margin: 0,
              display: "flex",
              // justifyContent: "center",
              padding: "25px",
              flexDirection: "row",
            }}
          >
            <SoftTypography variant="h6" fontWeight="bold" color="#FFFFFF">
              Master
            </SoftTypography>
            <CardMedia
              src={grade}
              component="img"
              sx={{
                maxWidth: "20px",
                height: "100%",
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
                fontSize: "0.9rem",
                marginTop: "1.5px",
              }}
            >
              {challengeDetail.nickName}
            </SoftTypography>
          </SoftBox>

          <SoftBox
            mt={6}
            textAlign="center"
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <SoftButton
              variant="gradient"
              color="dark"
              component={Link}
              to={`/challenge/list/${pv.currentPage}`}
            >
              뒤로
            </SoftButton>
            {localUserId === challengeDetail.userId ||
            challengeDetail.adminYn === "y" ? (
              // 작성자 또는 관리자일 경우 삭제
              <>
                <SoftButton
                  variant="gradient"
                  color="dark"
                  onClick={() => handleShowAlert("정말 삭제하시겠습니까?")}
                >
                  삭제
                </SoftButton>
              </>
            ) : null}
            {isJoined && challengeDetail.proceed === "pr" ? (
              // 참여중이면서 진행중일 경우 '인증하기', 아닐 경우 '참여하기'
              <SoftButton
                variant="gradient"
                color="dark"
                component={Link}
                to={`/challenge/verify/${challengeDetail.chId}`}
              >
                인증하기
              </SoftButton>
            ) : !isJoined && challengeDetail.proceed === "rec" ? (
              <>
                <SoftButton
                  variant="gradient"
                  color="dark"
                  onClick={handleJoinButtonClick}
                >
                  참여하기
                </SoftButton>
                {showJoinAlert && (
                  <AlertComponent
                    message="참여 완료! 챌린지를 끝까지 완수해보세요."
                    color="success"
                    onClose={handleAlertClose}
                  />
                )}
              </>
            ) : null}
          </SoftBox>
        </SoftBox>
        {showDeleteAlert && (
          <AlertComponent
            message={deleteMessage}
            color="white"
            onClose={handleAlertClose}
          />
        )}
        {/* <SoftAlert
          color="white"
          position="fixed"
          top="20%"
          transform="translateX(-50%)"
          zIndex="9999"
          flexDirection="column" // 수직으로 배치
          alignItems="center" // 가운데 정렬
        >
          
          <SoftButton
            variant="gradient"
            color="info"
            onClick={handleDeleteButtonClick}
            style={{ marginRight: "10px" }}
          >
            삭제
          </SoftButton>
          {showDeleteAlert && (
            <AlertComponent
              message={deleteMessage}
              color="white"
              onClose={handleAlertClose}
            />
          )}
          <SoftButton
            variant="gradient"
            color="info"
            onClick={handleDeleteButtonClick}
          >
            취소
          </SoftButton>
        </SoftAlert> */}
      </Card>
      <Footer />
    </DashboardLayout>
  );
}
export default ChallengeDetail;
