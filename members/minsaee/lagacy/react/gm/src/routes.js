/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

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

// Detail routes
import ChallengeVerify from "layouts/challenge/layaout_verify";
import ChallengeDetail from "layouts/challenge/layout_detail";
import ChallengeCreate from "layouts/challenge/layout_create";
import MainPage from "layouts/main";
import Survey from "layouts/authentication/survey";
import PlanPage from "layouts/authentication/plan";

const routes = [
  {
    type: "collapse",
    name: "My Page",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Personal Training",
    key: "PT",
    route: "/PT",
    icon: <CustomerSupport size="12px" />,
    component: <PT />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Challenge",
    key: "Challenge",
    route: "/Challenge",
    icon: <Office size="12px" />,
    component: <Challenge />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Store",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },

  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },

  {
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Admin",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    key: "challengeCreate",
    route: "/challenge/create",
    component: <ChallengeCreate />,
  },

  // {
  //   key: "challengeDetail",
  //   route: "/challenge/1/detail",
  //   component: <ChallengeDetail />,
  // },

  {
    key: "challengeVerify",
    route: "/challenge/1/verify",
    component: <ChallengeVerify />,
  },

  {
    key: "main",
    route: "/main",
    component: <MainPage />,
  },

  {
    key: "survey",
    route: "/authentication/survey",
    component: <Survey />,
  },

  {
    key: "PlanPage",
    route: "/authentication/plan",
    component: <PlanPage />,
  },
];

export default routes;
