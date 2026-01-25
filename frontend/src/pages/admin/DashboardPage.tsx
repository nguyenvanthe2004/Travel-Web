import type React from "react";

import AdminLayout from "../../layouts/AdminLayout";
import Dashboard from "../../components/admin/Dashboard";
import HeaderAdmin from "../../components/admin/HeaderAdmin";

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <HeaderAdmin />
      <Dashboard />
    </AdminLayout>
  );
};
export default DashboardPage;
