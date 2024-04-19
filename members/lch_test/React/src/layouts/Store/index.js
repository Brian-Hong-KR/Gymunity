import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

import ProductList from "layouts/Store/components/ProductList";

function Store() {

  return (
    <DashboardLayout>
        <DashboardNavbar />
        <ProductList />
        <GymunityNavbar />
    </DashboardLayout>
  );
}

export default Store;
