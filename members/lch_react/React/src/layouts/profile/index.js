import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileData from "layouts/profile/components/ProfileData";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ProfileData />
    </DashboardLayout>
  );
}

export default Overview;
