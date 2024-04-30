import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PointDetail from "./components";

function UserPointPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PointDetail />
    </DashboardLayout>
  );
}

export default UserPointPage;
