import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ProductList from "layouts/Store/components/ProductList";

function Store() {

  return (
    <DashboardLayout>
        <DashboardNavbar />
        <ProductList />
    </DashboardLayout>
  );
}

export default Store;
