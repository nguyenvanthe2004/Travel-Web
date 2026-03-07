import type React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import Dashboard from "../../../components/admin/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};
export default DashboardPage;
