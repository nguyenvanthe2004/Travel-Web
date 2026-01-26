import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UpdateLocationMain from "../../components/admin/UpdateLocationMain";

const UpdateLocation: React.FC = () => {
  return (
    <AdminLayout>
      <UpdateLocationMain />
    </AdminLayout>
  );
};
export default UpdateLocation;