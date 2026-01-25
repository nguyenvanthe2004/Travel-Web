import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import HotelMain from "../../components/admin/HotelsMain";

const HotelManager: React.FC = () => {
  return (
    <AdminLayout>
      <HotelMain />
    </AdminLayout>
  );
};
export default HotelManager;
