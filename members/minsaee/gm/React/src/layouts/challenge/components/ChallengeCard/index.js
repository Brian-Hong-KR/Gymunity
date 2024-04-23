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
import icon_start from "assets/images/icon/start.png";
import icon_point from "assets/images/icon/point.png";

function ChallengeCard({ challenge }) {
  // console.log("isJoined: ", challenge.isJoined);
  // console.log("ch_id: ", challenge.ch_id);
  // console.log("ch_id: ", typeof challenge.ch_id);

  // 예시 81번 나나

  const { image, category, grade, verify_term, period, remainingDays } =
    DataConverter(challenge);

  let buttonComponent;
  let ddayComponent;

  //모집중
  if (challenge.proceed === "rec") {
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challenge.ch_id}`}
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
        D - {remainingDays}
      </SoftBox>
    );
  } else if (challenge.proceed === "pr" && challenge.isJoined) {
    buttonComponent = (
      <>
        <SoftButton
          component={Link}
          to={`/challenge/detail/${challenge.ch_id}`}
          variant="outlined"
          size="small"
          color="primary"
          sx={{ minWidth: "140px", marginRight: "10px" }}
        >
          자세히 보기
        </SoftButton>
        <SoftButton
          component={Link}
          to={`/challenge/verify/${challenge.ch_id}`}
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
        to={`/challenge/detail/${challenge.ch_id}`}
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
        to={`/challenge/detail/${challenge.ch_id}`}
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
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        // position: "relative",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SoftBox
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="170px"
        zIndex={2}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "170px",
          zIndex: 2,
        }}
      ></SoftBox>
      <SoftBox
        position="relative"
        width="310px"
        height="170px"
        shadow="xl"
        borderRadius="xl"
        style={{ zIndex: 1, textAlign: "center" }}
      >
        <SoftBox
          position="absolute"
          width="180px"
          height="30px"
          shadow="xl"
          borderRadius="xl"
          style={{ zIndex: 1 }}
          component="div"
          sx={{
            ...typography.h6,
            top: "-10px",
            left: "5px",
            maxWidth: "100%",
            maxHeight: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "contain",
            objectPosition: "center",
            backgroundColor: "#FF3636",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "2px solid #FF3636",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {category}
        </SoftBox>
        <CardMedia
          src={image}
          component="img"
          sx={{
            maxWidth: "100%",
            height: "auto",
            margin: "0 auto",
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
            aspectRatio: "16 / 9",
          }}
        />
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
          {challenge.count}
        </SoftBox>
        {ddayComponent}
      </SoftBox>
      <SoftBox pt={2} px={0.5} style={{ marginTop: "10px" }}>
        <SoftBox mb={1}>
          <SoftTypography
            component={Link}
            to={`/challenge/detail/${challenge.ch_id}`}
            variant="h5"
            textTransform="capitalize"
          >
            {challenge.title}
          </SoftTypography>
        </SoftBox>
        <SoftBox
          position="absolute"
          style={{
            color: "#FFFFFF",
            fontSize: "1.2rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
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
            master:
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
            {challenge.nick_name}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={3} lineHeight={0}>
          <SoftBox
            mt={6}
            mb={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50px"
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
                {challenge.betting_point}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <SoftBox mb={3} lineHeight={0}>
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="25px"
          >
            {buttonComponent}
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
    ch_id: PropTypes.number.isRequired,
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
