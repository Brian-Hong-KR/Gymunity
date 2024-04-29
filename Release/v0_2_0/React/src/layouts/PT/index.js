import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PersonalTraining from "layouts/PT/components/PersonalTraining";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

function PT() {
  return (
    <DashboardLayout>
        <DashboardNavbar />
        <PersonalTraining />
    </DashboardLayout>
  );
}

export default PT;
