import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UpdateLocation from "../../components/admin/UpdateLocation";

const DetailLocationAdmin: React.FC = () => {
  return (
    <AdminLayout>
      <UpdateLocation />
    </AdminLayout>
  );
};
export default DetailLocationAdmin;