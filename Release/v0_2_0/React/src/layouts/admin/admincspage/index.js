import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AdminCsDetail from "./components";

function AdminCsPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AdminCsDetail />
    </DashboardLayout>
  );
}

export default AdminCsPage;
