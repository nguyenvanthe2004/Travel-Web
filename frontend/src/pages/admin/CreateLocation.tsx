import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddLocationMain from "../../components/admin/AddLocationMain";

const CreateLocation: React.FC = () => {
  return (
    <AdminLayout>
      <AddLocationMain />
    </AdminLayout>
  );
};
export default CreateLocation;