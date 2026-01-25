import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UserMain from "../../components/admin/UserMain";

const LocationManager: React.FC = () => {
  return (
    <AdminLayout>
      <UserMain />
    </AdminLayout>
  );
};
export default LocationManager;