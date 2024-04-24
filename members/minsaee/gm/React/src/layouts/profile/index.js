import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileData from "layouts/profile/components/ProfileData";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import GymunityNavbar from "examples/Navbars/GymunityNavbar";


function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ProfileData />
    </DashboardLayout>
  );
}

export default Overview;
