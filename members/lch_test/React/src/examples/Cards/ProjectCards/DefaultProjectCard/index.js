// react-router-dom components
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import typography from "assets/theme/base/typography";

// 카테고리 이미지
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";
import categoryToIncreaseMuscle from "assets/images/category/category_toincreasemuscle.jpg";
import categoryPhsicalStrength from "assets/images/category/category_physicalstrength.jpg";

function DefaultProjectCard({ challenge, extendedChallenge }) {
  // const { type, color } = extendedChallenge;

  //카테고리명 변환
  let image;
  let category;
  if (challenge.category === 1) {
    category = "체지방 감소";
    image = categoryToLoseWeight;
  } else if (challenge.category === 2) {
    category = "근육량 증가";
    image = categoryToIncreaseMuscle;
  } else {
    category = "종합 건강 증진";
    image = categoryPhsicalStrength;
  }

  // 예시 81번 나나

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        position: "relative",
      }}
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
        {category} {challenge.proceed}
      </SoftBox>
      <SoftBox
        position="relative"
        width="310px"
        height="170px"
        shadow="xl"
        borderRadius="xl"
        style={{ zIndex: 0 }}
      >
        <CardMedia
          src={image}
          component="img"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </SoftBox>
      <SoftBox pt={2} px={0.5}>
        <SoftBox mb={1}>
          <SoftTypography
            component={Link}
            // to={`/challenge/detail/${challenge.ch_id}`}
            to={`/challenge/detail/${challenge.ch_id}`}
            variant="h5"
            textTransform="capitalize"
          >
            {challenge.title}
          </SoftTypography>
        </SoftBox>
        <SoftBox>
          <SoftTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            textGradient
          >
            master : {challenge.grade_name} {challenge.nick_name}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1}>{challenge.count} </SoftBox>
        <SoftBox></SoftBox>
        <SoftBox mb={1}>{/* {cetify_frequency} {challenge_term} */}</SoftBox>
        <SoftBox></SoftBox>
        <SoftBox mb={3} lineHeight={0}></SoftBox>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {extendedChallenge.type === "joined" ? (
            <SoftButton
              component={Link}
              to={`/challenge/verify/${challenge.ch_id}`}
              variant="outlined"
              size="small"
              color={extendedChallenge.color}
              // color="primary"
            >
              인증하기
            </SoftButton>
          ) : (
            <SoftButton
              component={Link}
              to={`/challenge/detail/${challenge.ch_id}`}
              variant="outlined"
              size="small"
              color={extendedChallenge.color}
              // color="info"
            >
              참여하기
            </SoftButton>
          )}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

DefaultProjectCard.defaultProps = {
  challenge: {
    total_participants: 0,
  },
  extendedChallenge: {
    type: "joined",
    color: "info",
  },
};

DefaultProjectCard.propTypes = {
  challenge: PropTypes.object.isRequired,
  extendedChallenge: PropTypes.shape({
    type: PropTypes.oneOf(["joined", "none"]).isRequired,
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
