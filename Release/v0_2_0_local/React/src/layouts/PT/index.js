import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PersonalTraining from "layouts/PT/components/PersonalTraining";
import PTChatbot from "layouts/PT/components/PTChatbot";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

function PT() {

  return (
    <DashboardLayout>
        <DashboardNavbar />
        <PersonalTraining />
        <PTChatbot />
    </DashboardLayout>
  );
}

export default PT;
