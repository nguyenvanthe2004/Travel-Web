import type React from "react";
import CreateHotelAdmin from "../../components/admin/CreateHotelAdmin";
import AdminLayout from "../../layouts/AdminLayout";

const CreateHotelPage: React.FC = () => {
  return (
    <AdminLayout>
      <CreateHotelAdmin />
    </AdminLayout>
  );
};
export default CreateHotelPage;
