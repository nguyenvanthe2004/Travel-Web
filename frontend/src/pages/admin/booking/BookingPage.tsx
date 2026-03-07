import type React from "react";
import BookingList from "../../../components/admin/BookingList";
import AdminLayout from "../../../layouts/AdminLayout";

const BookingPage: React.FC = () => {
  return (
    <AdminLayout>
      <BookingList />
    </AdminLayout>
  );
};
export default BookingPage;
