import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import PersonalTraining from "layouts/PT/components/PersonalTraining";
import PTChatbot from "layouts/PT/components/PTChatbot";

function PT() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <PersonalTraining />
        <PTChatbot />
      <Footer />
    </DashboardLayout>
  );
}

export default PT;
