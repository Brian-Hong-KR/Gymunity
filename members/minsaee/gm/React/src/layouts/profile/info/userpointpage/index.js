import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";
import PointDetail from "./components";

function UserPointPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PointDetail />
      <GymunityNavbar />
    </DashboardLayout>
  );
}

export default UserPointPage;
