import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import PersonalTraining from "layouts/PT/components/PersonalTraining";
import TestP from "layouts/PT/components/TestP";


function PT() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <PersonalTraining />
      <Footer />
    </DashboardLayout>
  );
}

export default PT;
