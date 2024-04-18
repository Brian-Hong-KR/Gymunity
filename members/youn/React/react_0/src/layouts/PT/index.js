import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PersonalTraining from "layouts/PT/components/PersonalTraining";
import PTChatbot from "layouts/PT/components/PTChatbot";

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
