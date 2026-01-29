import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import BookingList from "../../components/admin/BookingList";

const BookingManager: React.FC = () => {
  return (
    <AdminLayout>
      <BookingList />
    </AdminLayout>
  );
};
export default BookingManager;