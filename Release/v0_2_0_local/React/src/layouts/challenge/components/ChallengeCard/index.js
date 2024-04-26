// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import typography from "assets/theme/base/typography";
import DataConverter from "../DataConverter";

// Image
import icon_count from "assets/images/icon/count_person.png";
import icon_start from "assets/images/icon/start_bk.png";
import icon_point from "assets/images/icon/point.png";

function ChallengeCard({ challenge }) {
  console.log("isJoined: ", challenge.isJoined);
  console.log("chId: ", challenge.chId);
  // console.log("chId: ", typeof challenge.chId);

  // 예시 81번 나나

  const { image, category, grade, verifyTerm, period, remainingDays } =
    DataConverter(challenge);

  let buttonComponent;
  let ddayComponent;

  //모집중
  if (challenge.proceed === "rec") {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challenge.chId}`}
        variant="outlined"
        size="small"
        color="primary"
        sx={{ width: "100%", height: "100px", padding: 0 }}
      >
        자세히
      </SoftButton>
    );
    ddayComponent = (
      <SoftBox
        bg="rgba(255, 255, 255, 0.8)"
        p={1}
        borderRadius="xl"
        position="absolute"
        bottom="-6px"
        left="0px"
        zIndex={3}
        style={{
          // color: "#FFFFFF",
          fontSize: "1rem",
          fontWeight: "bold",
          // textShadow: "0 0 5px #000000",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          src={icon_start}
          component="img"
          sx={{
            maxWidth: "24px",
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
  } else if (challenge.proceed === "pr" && challenge.isJoined) {
    buttonComponent = (
      <>
        <SoftButton
          component={Link}
          to={`/challenge/detail/${challenge.chId}`}
          variant="outlined"
          size="small"
          color="primary"
          sx={{ minWidth: "140px", marginRight: "10px" }}
        >
          자세히 보기
        </SoftButton>
        <SoftButton
          component={Link}
          to={`/challenge/verify/${challenge.chId}`}
          variant="outlined"
          size="small"
          color="error"
          sx={{ minWidth: "140px" }}
        >
          인증하기
        </SoftButton>
      </>
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
  } else if (challenge.proceed === "pr" && !challenge.isJoined) {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challenge.chId}`}
        variant="outlined"
        size="small"
        color="primary"
        sx={{ minWidth: "280px" }}
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
        to={`/challenge/detail/${challenge.chId}`}
        variant="outlined"
        size="small"
        color="light"
        sx={{ minWidth: "280px" }}
      >
        참여 종료
      </SoftButton>
    );
    ddayComponent = null;
  }
  return (
    <Card
      sx={{
        flexDirection: "row",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        position: "relative",
        display: "flex",
        justifyContent: "flex-start", // 좌측 정렬
        alignItems: "flex-start", // 상단 정렬
        // border: "1px solid #ccc", // 임시 테두리
      }}
    >
      <SoftBox //image + category + title + user
        mb={3}
        position="relative"
        width="120px"
        height="90px"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SoftBox //image + category
          position="relative"
          width="120px"
          height="90px"
          borderRadius="xl"
          style={{
            zIndex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            src={image}
            component="img"
            position="absolute"
            minWidth="120px"
            width="100%"
            height="90px"
            sx={{
              maxWidth: "120px",
              maxHeight: "100%",
              margin: "0 auto",
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <SoftBox
            position="absolute"
            minWidth="120px"
            width="100%"
            height="27px"
            borderRadius="xl"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              margin: 0,
              objectFit: "contain",
              backgroundColor: "rgba(189, 189, 189, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontSize: "0.7rem", // 폰트 사이즈 지정
              fontWeight: 700, // 폰트 굵기 지정 (700 = bold)
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // 그림자 효과 추가
              bottom: 0,
            }}
          >
            {category}
          </SoftBox>
        </SoftBox>
        <SoftBox // title + user
          position="relative"
          minWidth="150px"
          width="100%"
          height="30px"
          top="0"
          style={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <SoftBox //title
            mt={1}
            mb={1}
            minWidth="150px"
            width="100%"
            left="-45px"
            position="absolute" // position을 absolute로 설정
          >
            <SoftTypography
              variant="title"
              textTransform="capitalize"
              sx={{
                fontSize: "1.0rem", // 폰트 사이즈 지정
                fontWeight: 700, // 폰트 굵기 지정 (700 = bold)
              }}
            >
              {challenge.title}
            </SoftTypography>
          </SoftBox>
          <SoftBox // user
            mt={5}
            mb={1}
            minWidth="150px"
            width="100%"
            left="10px"
            position="absolute" // position을 absolute로 설정
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <SoftTypography
              variant="caption"
              fontWeight="regular"
              textTransform="capitalize"
              textGradient
              style={{
                fontSize: "0.9rem", // 폰트 사이즈 지정
                fontWeight: 700, // 폰트 굵기 지정 (700 = bold)
              }}
            >
              master:
            </SoftTypography>
            <CardMedia
              src={grade}
              component="img"
              sx={{
                maxWidth: "18px",
                height: "auto",
                margin: 0,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 0,
                position: "relative",
                top: "-1px",
                pa,
              }}
            />
            <SoftTypography
              variant="caption"
              fontWeight="regular"
              textTransform="capitalize"
              textGradient
              style={{
                fontSize: "1.0rem", // 폰트 사이즈 지정
                fontWeight: 700, // 폰트 굵기 지정 (700 = bold)
              }}
            >
              {challenge.nickName}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <SoftBox //title + user + term + period + point + dday
        pt={1}
        pb={1}
        ml={2}
        position="relative"
        minWidth="230px"
        width="100%"
        height="220px"
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          // border: "1px solid #ccc", // 임시 테두리
        }}
      >
        <SoftBox // dday + userinfo
          mt={6}
          mb={3}
          position="absolute"
          top="45px"
          minWidth="230px"
          width="100%"
          height="30px"
          style={{
            color: "#FFFFFF",
            fontSize: "1.2rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            // border: "1px solid #ccc", // 임시 테두리
          }}
        >
          <SoftBox //userinfo
            position="absolute"
            minWidth="150px"
            width="100%"
            height="30px"
            left="80px"
            style={{
              color: "#FFFFFF",
              fontSize: "1.2rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              // border: "1px solid #ccc", // 임시 테두리
            }}
          >
            {ddayComponent}
          </SoftBox>
          <SoftBox
            bg="rgba(255, 255, 255, 0.8)"
            p={1}
            borderRadius="xl"
            position="absolute"
            bottom="-3px"
            right="3px"
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
                marginRight: "9px",
                position: "relative",
                top: "-3px",
              }}
            />
            {challenge.count}
          </SoftBox>
        </SoftBox>
        <SoftBox
          mt={7}
          mb={3}
          position="absolute"
          top="28px"
          minWidth="230px"
          width="100%"
          height="30px"
        >
          <SoftBox
            mt={6}
            mb={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="70px"
          >
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
              <SoftTypography variant="h6" fontWeight="bold">
                {verifyTerm}
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
              <SoftTypography variant="h6" fontWeight="bold">
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
                sx={{ marginRight: "7px" }}
              >
                {challenge.bettingPoint}
              </SoftTypography>
            </SoftBox>

            {/* <SoftBox sx={{ flex: 1 }} mb={3} lineHeight={0}> */}
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="20px"
            >
              {buttonComponent}
            </SoftBox>
            {/* </SoftBox> */}
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

ChallengeCard.defaultProps = {
  challenge: {
    count: 0,
    color: "info",
  },
};

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    chId: PropTypes.number.isRequired,
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
    ]),
  }),
};

export default ChallengeCard;
