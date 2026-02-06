import type React from "react";
import CreateHotel from "../../components/admin/CreateHotel";
import AdminLayout from "../../layouts/AdminLayout";

const CreateHotelPage: React.FC = () => {
  return (
    <AdminLayout>
      <CreateHotel />
    </AdminLayout>
  );
};
export default CreateHotelPage;
