import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AdminVerify from "./components";

function AdminVerifyPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AdminVerify />
    </DashboardLayout>
  );
}

export default AdminVerifyPage;
