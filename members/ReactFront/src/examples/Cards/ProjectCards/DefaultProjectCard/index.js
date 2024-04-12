// react-router-dom components
import { Link } from "react-router-dom";

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
import SoftAvatar from "components/SoftAvatar";
import typography from "assets/theme/base/typography";

function DefaultProjectCard({
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
        {category}
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
            to={action.route}
            variant="h5"
            textTransform="capitalize"
          >
            {title}
          </SoftTypography>
        </SoftBox>
        <SoftBox>
          <SoftTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            textGradient
          >
            master : {master_grade} {master}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1}>{total_participants} </SoftBox>
        <SoftBox></SoftBox>
        <SoftBox mb={1}>
          {cetify_frequency} {challenge_term}
        </SoftBox>
        <SoftBox></SoftBox>
        <SoftBox mb={3} lineHeight={0}></SoftBox>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "joined" ? (
            <SoftButton
              component={Link}
              to="/challenge/1/verify"
              variant="outlined"
              size="small"
              color={action.color}
            >
              인증하기
            </SoftButton>
          ) : (
            <SoftButton
              component={Link}
              to="/challenge/1/detail"
              // <SoftButton component={Link} to={`challenge/${ch_id}/detail`} />
              // to={action.route}
              // component="a"
              // href={action.route}
              // target="_blank"
              // rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              참여하기
            </SoftButton>
          )}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  total_participants: 0,
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
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

export default DefaultProjectCard;
