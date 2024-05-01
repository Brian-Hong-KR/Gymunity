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
import icon_count from "assets/images/icon/count_person_red.png";
import icon_start from "assets/images/icon/start_bk.png";
import icon_point from "assets/images/icon/point.png";

function ChallengeCard({ challenge }) {
  const { image, category, grade, verifyTerm, remainingDays } =
    DataConverter(challenge);

  return (
    <Card>
      <SoftBox
        pt={1}
        pb={1}
        pl={1}
        // pr={1}
        // width="350px"
        width="100%"
        height="170px"
        sx={{
          flexDirection: "column",
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "ceter", // 상단 정렬
          // border: "1px solid #ccc", // 임시 테두리
        }}
      >
        <SoftBox //image + category + title + user
          mb={2}
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
          <SoftBox // title + user + dday + count
            ml={2}
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
              textAlign: "left",
            }}
          >
            <SoftBox //title
              mt={1}
              mb={1}
              minWidth="195px"
              width="100%"
              top="-5px"
              left="8px"
              position="absolute" // position을 absolute로 설정
              sx={{
                // border: "1px solid #ccc", // 임시 테두리
                overflow: "hidden", // 넘치는 부분 숨기기
                textOverflow: "ellipsis", // 넘치는 부분에 생략 기호(...) 표시
                whiteSpace: "nowrap", // 텍스트를 한 줄로 유지
              }}
            >
              <SoftTypography
                variant="title"
                textTransform="capitalize"
                sx={{
                  fontSize: "1.0rem", // 폰트 사이즈 지정
                  fontWeight: 700, // 폰트 굵기 지정 (700 = bold)
                  textAlign: "left",
                }}
              >
                {challenge.title}
              </SoftTypography>
            </SoftBox>
            <SoftBox // user
              mt={5}
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
                margin="0"
                sx={{
                  maxWidth: "18px",
                  height: "auto",
                  borderRadius: 0,
                  bottom: "0",
                  position: "relative",
                  margin: "0",
                  marginTop: "-2px",
                  marginRight: "4px",
                  marginLeft: "4px",
                }}
              />
              <SoftTypography
                minWidth="115px"
                width="100%"
                variant="caption"
                fontWeight="regular"
                textTransform="capitalize"
                textGradient
                style={{
                  fontSize: "0.9rem", // 폰트 사이즈 지정
                  fontWeight: 700, // 폰트 굵기 지정 (700 = bold)
                  marginTop: "1px",
                  // border: "1px solid #ccc", // 임시 테두리
                  overflow: "hidden", // 넘치는 부분 숨기기
                  textOverflow: "ellipsis", // 넘치는 부분에 생략 기호(...) 표시
                  whiteSpace: "nowrap", // 텍스트를 한 줄로 유지
                }}
              >
                {challenge.nickName}
              </SoftTypography>
            </SoftBox>
            <SoftBox // dday + count
              position="relative"
              minWidth="150px"
              width="100%"
              height="30px"
              bottom="0"
              style={{
                zIndex: 1,
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SoftBox //dday
                position="absolute"
                minWidth="150px"
                width="100%"
                height="30px"
                left="8px"
                bottom="-64px"
                style={{
                  fontSize: "1rem",
                  textShadow: "0 0 1px #003399",
                  display: "flex",
                  alignItems: "center",
                  // border: "1px solid #ccc", // 임시 테두리
                }}
              >
                {challenge.proceed === "done" ? (
                  <SoftBox>
                    <SoftTypography
                      sx={{
                        fontSize: "1rem",
                        color: "#808080",
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
                        maxWidth: "20px",
                        height: "auto",
                        margin: 0,
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 0,
                        position: "relative",
                        bottom: "1px",
                        right: "0px",
                        marginRight: "3px",
                      }}
                    />

                    {challenge.proceed === "rec" ? (
                      <>D - {remainingDays}</>
                    ) : (
                      "진행중"
                    )}
                  </>
                )}
              </SoftBox>

              <SoftBox
                position="absolute"
                minWidth="150px"
                width="100%"
                height="30px"
                left="110px"
                bottom="-64px"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  textShadow: "0 0 1px #000000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  src={icon_count}
                  component="img"
                  sx={{
                    maxWidth: "13px",
                    height: "auto",
                    margin: 0,
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 0,
                    position: "relative",
                    bottom: "2px",
                    right: "8px",
                  }}
                />
                {challenge.count}
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <SoftBox // term + period + point + button
          mb={3}
          minWidth="195px"
          width="100%"
          height="170px"
          position="relative"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SoftBox
            flex={1}
            width="100%"
            height="50px"
            borderRadius="xl"
            sx={{
              border: "1px solid #BDBDBD",
              justifyContent: "center", // 가로 방향 가운데 정렬
              display: "flex",
              marginRight: "10px",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: 700,
              alignItems: "center",
              padding: "0",
              color: "#808080",
              overflow: "hidden", // 넘치는 부분 숨기기
              whiteSpace: "nowrap", // 텍스트를 한 줄로 유지
            }}
          >
            {verifyTerm}
          </SoftBox>
          <SoftBox
            flex={1}
            width="100%"
            height="50px"
            borderRadius="xl"
            sx={{
              border: "1px solid #BDBDBD",
              justifyContent: "center", // 가로 방향 가운데 정렬
              display: "flex",
              marginRight: "10px",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: 700,
              alignItems: "center",
              padding: "0",
              color: "#808080",
            }}
          >
            {challenge.challengePeriod}주간
          </SoftBox>
          <SoftBox
            flex={1}
            width="100%"
            height="50px"
            borderRadius="xl"
            sx={{
              border: "1px solid #BDBDBD",
              justifyContent: "center", // 가로 방향 가운데 정렬
              display: "flex",
              marginRight: "10px",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: 700,
              alignItems: "center",
              padding: "0 2px 0 0",
              color: "#808080",
            }}
          >
            <CardMedia
              src={icon_point}
              component="img"
              left="3px"
              sx={{
                maxWidth: "28px",
                height: "auto",
                margin: "0 0 0 0",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 0,
                position: "relative",
                left: "-3px",
                top: "1px",
              }}
            />
            {challenge.bettingPoint}
          </SoftBox>
          {challenge.isJoined && challenge.proceed === "pr" ? (
            <SoftBox
              flex={1}
              width="100%"
              height="50px"
              borderRadius="xl"
              sx={{
                justifyContent: "center", // 가로 방향 가운데 정렬
                display: "flex",
                marginRight: "10px",
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
                alignItems: "center",
                padding: "0",
              }}
            >
              <SoftButton
                component={Link}
                to={`/challenge/verify/${challenge.chId}`}
                size="small"
                color="dark"
                sx={{
                  padding: "0",
                  color: "transparent", // 배경색 투명
                  width: "100%", // 버튼 너비를 100%로 설정
                  height: "100%", // 버튼 높이를 100%로 설정
                }}
              >
                인증하기
              </SoftButton>
            </SoftBox>
          ) : null}
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
