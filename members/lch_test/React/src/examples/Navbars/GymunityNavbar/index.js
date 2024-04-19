import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/GymunityNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import { Grid } from '@mui/material';

function GymunityNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

   return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox
          color='white'
          mb={{ xs: 0, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >

      <Link to='/Profile'>
        <Grid container align="center">
            <Grid item xs={12} sm={6} xl={3} >
                 <IconButton
                    size='large'
                    color='white'
                  >
                    <Icon className={light ? 'text-white' : 'text-dark'}>
                      {'person'}
                    </Icon>
                 </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} xl={3} >
                <SoftTypography variant="button" fontWeight="medium" color="white">
                My Page
                </SoftTypography>
            </Grid>
        </Grid>
      </Link>

      <Link to='/PT'>
        <Grid container align="center">
            <Grid item xs={12} sm={6} xl={3}>
                 <IconButton
                    size='large'
                    color='white'
                  >
                    <Icon className={light ? 'text-white' : 'text-dark'}>
                      {'assistant'}
                    </Icon>
                 </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} xl={3} >
                <SoftTypography variant="button" fontWeight="medium" color="white">
                PT
                </SoftTypography>
            </Grid>
        </Grid>
      </Link>

      <Link to='/Challenge/list/1'>
        <Grid container align="center">
            <Grid item xs={12} sm={6} xl={3} >
                 <IconButton
                    size='large'
                    color='white'
                  >
                    <Icon className={light ? 'text-white' : 'text-dark'}>
                      {'group'}
                    </Icon>
                 </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} xl={3} >
                <SoftTypography variant="button" fontWeight="medium" color="white">
                Challenge
                </SoftTypography>
            </Grid>
        </Grid>
      </Link>

      <Link to='/Store'>
        <Grid container align="center">
            <Grid item xs={12} sm={6} xl={3} >
                 <IconButton
                    size='large'
                    color='white'
                  >
                    <Icon className={light ? 'text-white' : 'text-dark'}>
                      {'store'}
                    </Icon>
                 </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
                <SoftTypography variant="button" fontWeight="medium" color="white">
                Store
                </SoftTypography>
            </Grid>
        </Grid>
      </Link>

        </SoftBox>


      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
GymunityNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
GymunityNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default GymunityNavbar;
