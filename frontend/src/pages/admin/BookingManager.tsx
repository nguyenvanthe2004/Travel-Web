import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import BookingMain from "../../components/admin/BookingMain";

const LocationManager: React.FC = () => {
  return (
    <AdminLayout>
      <BookingMain />
    </AdminLayout>
  );
};
export default LocationManager;