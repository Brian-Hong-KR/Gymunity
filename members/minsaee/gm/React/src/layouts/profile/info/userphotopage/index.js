import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

import PhotoList from "./components";

function UserPhotoPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PhotoList />
      <GymunityNavbar />
    </DashboardLayout>
  );
}

export default UserPhotoPage;
