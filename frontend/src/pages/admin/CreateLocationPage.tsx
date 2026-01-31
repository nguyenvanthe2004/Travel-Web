import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import CreateLocation from "../../components/admin/CreateLocation";

const CreateLocationPage: React.FC = () => {
  return (
    <AdminLayout>
      <CreateLocation />
    </AdminLayout>
  );
};
export default CreateLocationPage;