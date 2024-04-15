// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import PT from "layouts/PT";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Challenge from "layouts/challenge/layout_list";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import ChallengeCreate from 'layouts/challenge/layout_create';
import ChallengeDetail from 'layouts/challenge/layout_detail';
import ChallengeVerify from 'layouts/challenge/layaout_verify';
import PointPage from 'layouts/profile/info/PointPage';
import PhotoPage from 'layouts/profile/info/PhotoPage';
import UserManagePage from 'layouts/dashboard/info/UserManagePage';

const routes = [
  {
    type: 'collapse',
    name: 'My Page',
    key: 'profile',
    route: '/profile',
    icon: <CustomerSupport size='12px' />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: 'collapse',
    name: 'Personal Training',
    key: 'PT',
    route: '/PT',
    icon: <CustomerSupport size='12px' />,
    component: <PT />,
    noCollapse: true,
  },
  {
    type: 'collapse',
    name: 'Challenge',
    key: 'Challenge',
    route: '/Challenge',
    icon: <Office size='12px' />,
    component: <Challenge />,
    noCollapse: true,
  },
  {
    type: 'collapse',
    name: 'Store',
    key: 'billing',
    route: '/billing',
    icon: <CreditCard size='12px' />,
    component: <Billing />,
    noCollapse: true,
  },

  {
    type: 'collapse',
    name: 'Sign In',
    key: 'sign-in',
    route: '/authentication/sign-in',
    icon: <Document size='12px' />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: 'collapse',
    name: 'Sign Up',
    key: 'sign-up',
    route: '/authentication/sign-up',
    icon: <SpaceShip size='12px' />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: 'collapse',
    name: 'Admin',
    key: 'dashboard',
    route: '/dashboard',
    icon: <Shop size='12px' />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    key: 'ChallengeCreate',
    route: 'challenge/create',
    component: <ChallengeCreate />,
  },

  {
    key: 'ChallengeDetail',
    route: 'challenge/1/detail',
    component: <ChallengeDetail />,
  },

  {
    key: 'ChallengeVerify',
    route: 'challenge/1/verify',
    component: <ChallengeVerify />,
  },

  {
    key: 'point',
    route: '/point',
    component: <PointPage />,
  },

  {
    key: 'photo',
    route: '/photo',
    component: <PhotoPage />,
  },

  {
    key: 'usermanage',
    route: '/usermanage',
    component: <UserManagePage />,
  },
];

export default routes;
