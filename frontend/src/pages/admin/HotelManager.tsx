import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import HotelList from "../../components/admin/HotelList";

const HotelManager: React.FC = () => {
  return (
    <AdminLayout>
      <HotelList />
    </AdminLayout>
  );
};
export default HotelManager;
