import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react';

const ModifyPlanPage = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <h1>Pt 플랜 다시 세우기</h1>
      </div>
    </DashboardLayout>
  );
};

export default ModifyPlanPage;