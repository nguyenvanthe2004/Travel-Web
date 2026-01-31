import type React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import BookingList from "../../components/admin/BookingList";

const BookingPage: React.FC = () => {
  return (
    <AdminLayout>
      <BookingList />
    </AdminLayout>
  );
};
export default BookingPage;