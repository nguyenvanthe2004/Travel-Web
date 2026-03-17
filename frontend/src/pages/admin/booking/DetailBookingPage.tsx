import type React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import DetailBooking from "../../../components/admin/DetailBooking";

const DetailBookingPage: React.FC = () => {
  return (
    <AdminLayout>
      <DetailBooking />
    </AdminLayout>
  );
};
export default DetailBookingPage;
