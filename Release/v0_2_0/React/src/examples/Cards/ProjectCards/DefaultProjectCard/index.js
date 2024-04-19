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

// 이미지
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";
import categoryToIncreaseMuscle from "assets/images/category/category_toincreasemuscle.jpg";
import categoryPhsicalStrength from "assets/images/category/category_physicalstrength.jpg";
import icon_count from "assets/images/icon/count_person.png";
import icon_bronze from "assets/images/grade/grade_bronze.png";

function DefaultProjectCard({ challenge }) {
  console.log("isJoined: ", challenge.isJoined);
  console.log("ch_id: ", challenge.ch_id);

  //카테고리명 변환
  let image;
  let category;
  switch (challenge.category) {
    case 1:
      category = "체지방 감소";
      image = categoryToLoseWeight;
      break;
    case 2:
      category = "근육량 증가";
      image = categoryToIncreaseMuscle;
      break;
    case 3:
      category = "종합 건강 증진";
      image = categoryPhsicalStrength;
      break;
  }

  //진행상태 변환
  let proceed;
  switch (challenge.proceed) {
    case "rec":
      proceed = "참여 가능";
      break;
    case "pr":
      proceed = "진행중";
      break;
    case "done":
      proceed = "종료";
      break;
  }

  //등급이미지 변환
  let grade;
  switch (challenge.grade_name) {
    case "브론즈":
      grade = icon_bronze;
      break;
    case "실버":
      grade = icon_bronze;
      break;
    case "골드":
      grade = icon_bronze;
      break;
    case "플래티넘":
      grade = icon_bronze;
      break;
  }

  // 예시 81번 나나
  let classifyingComponent;
  let buttonComponent;

  if (challenge.isJoined && challenge.proceed === "pr") {
    classifyingComponent = (
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
          left: "-10px",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: 0,
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "contain",
          objectPosition: "center",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {category} {proceed}
      </SoftBox>
    );
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
  } else if (!challenge.isJoined && challenge.proceed === "done") {
    classifyingComponent = (
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
          left: "-10px",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: 0,
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "contain",
          objectPosition: "center",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {category} {proceed}
      </SoftBox>
    );
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challenge.ch_id}`}
        variant="outlined"
        size="small"
        color="light"
      >
        참여 종료
      </SoftButton>
    );
  } else {
    classifyingComponent = (
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
          left: "-10px",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: 0,
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "contain",
          objectPosition: "center",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {category} {proceed}
      </SoftBox>
    );
    buttonComponent = (
      <SoftButton
        component={Link}
        to={`/challenge/detail/${challenge.ch_id}`}
        variant="outlined"
        size="small"
        color="primary"
      >
        자세히 보기
      </SoftButton>
    );
  }
  return (
    <Card
      sx={{
        // display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        // position: "relative",
        marginBottom: "30px",
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
      >
        {classifyingComponent}
      </SoftBox>
      <SoftBox
        position="relative"
        width="310px"
        height="170px"
        shadow="xl"
        borderRadius="xl"
        style={{ zIndex: 1 }}
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
          borderRadius="xl"
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
                boxShadow: ({ boxShadows: { md } }) => md,
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
        <SoftBox mb={1}>{/* {verify_term} {challenge_period} */}</SoftBox>

        <SoftBox mb={3} lineHeight={0}>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="50px"
          >
            {buttonComponent}
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

DefaultProjectCard.defaultProps = {
  challenge: {
    count: 0,
    color: "info",
  },
};

DefaultProjectCard.propTypes = {
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

export default DefaultProjectCard;
