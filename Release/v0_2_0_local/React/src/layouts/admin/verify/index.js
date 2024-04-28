import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AdminVerify from "./components";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PhotoList from "layouts/profile/info/userphotopage/components";

function AdminVerifyPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AdminVerify />
    </DashboardLayout>
  );
}

export default AdminVerifyPage;
