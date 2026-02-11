import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DetailHotel from "../../components/admin/DetailHotel";

const DetailHotelPage: React.FC = () => {
  return (
    <AdminLayout>
      <DetailHotel />
    </AdminLayout>
  );
};
export default DetailHotelPage;
