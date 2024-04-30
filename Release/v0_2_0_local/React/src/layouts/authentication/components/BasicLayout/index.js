import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PageLayout from "examples/LayoutContainers/PageLayout";

function BasicLayout({ title = "", description = "", children }) {
  return (
    <PageLayout>
      <SoftBox mx={2} my={2} pt={6} pb={10}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={10} lg={4}>
            <SoftBox mt={6} mb={1}>
              <SoftTypography variant="h1" color="white" fontWeight="bold">
                {title}
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography
                variant="body2"
                color="white"
                fontWeight="regular"
              >
                {description}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox
        mt={{ xs: -26, lg: -24 }}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </SoftBox>
    </PageLayout>
  );
}

BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
