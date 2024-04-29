import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PhotoList from "./components";

function UserPhotoPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PhotoList />
    </DashboardLayout>
  );
}

export default UserPhotoPage;
