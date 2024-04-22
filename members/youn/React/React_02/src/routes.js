// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import PT from "layouts/PT";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Challenge from "layouts/challenge/layout_list";
import Store from "layouts/Store";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

//route
import ChallengeCreate from "layouts/challenge/layout_create";
import ChallengeDetail from "layouts/challenge/layout_detail";
import ChallengeVerify from "layouts/challenge/layaout_verify";
import PointPage from "layouts/dashboard/info/PointPage";
import PhotoPage from "layouts/profile/info/PhotoPage";
import UserManagePage from "layouts/dashboard/info/UserManagePage";
import VerifyPage from "layouts/dashboard/info/VerifyPage";
import ModifyPlanPage from "layouts/profile/info/ModifyPlanPage";
import MainPage from "layouts/main";
import Survey from "layouts/authentication/survey";
import PlanPage from "layouts/authentication/plan";
import EditUser from 'layouts/profile/info/EditUser';
import DeleteUser from 'layouts/profile/info/DeleteUser';




const routes = [
  {
    type: 'collapse',
    name: 'My Page',
    key: 'profile',
    route: '/profile',
    icon: <CreditCard size='12px' />,
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
    route: '/Challenge/list/1',
    icon: <SpaceShip size='12px' />,
    component: <Challenge />,
    noCollapse: true,
  },
  {
    type: 'collapse',
    name: 'Store',
    key: 'Store',
    route: '/Store',
    icon: <Shop size='12px' />,
    component: <Store />,
    noCollapse: true,
  },

  {
    key: 'sign-in',
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    key: 'sign-up',
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
  {
    type: 'collapse',
    name: 'Admin',
    key: 'dashboard',
    route: '/dashboard',
    icon: <Settings size='12px' />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    key: 'Challengelist',
    route: '/challenge/list/:currentPage',
    icon: <Office size='12px' />,
    component: <Challenge />,
    noCollapse: true,
  },
  {
    key: 'ChallengeCreate',
    route: '/challenge/create',
    component: <ChallengeCreate />,
  },
  {
    key: 'ChallengeDetail',
    route: '/challenge/detail/:ch_id',
    component: <ChallengeDetail />,
  },
  {
    key: 'ChallengeVerify',
    route: '/challenge/verify/:ch_id',
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

  {
    key: 'verify',
    route: '/verify',
    component: <VerifyPage />,
  },

  {
    key: 'modifyPlan',
    route: '/modifyPlan',
    component: <ModifyPlanPage />,
  },

  {
    key: 'main',
    route: '/main',
    component: <MainPage />,
  },

  {
    key: 'survey',
    route: '/authentication/survey',
    component: <Survey />,
  },

  {
    key: 'PlanPage',
    route: '/authentication/plan',
    component: <PlanPage />,
  },

  {
    key: 'editUser',
    route: '/profile/editUser',
    component: <EditUser />,
  },

  {
    key: 'deleteUser',
    route: '/profile/deleteUser',
    component: <DeleteUser />,
  },
];

export default routes;
