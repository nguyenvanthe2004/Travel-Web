import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import BookingManager from "../../components/booking/BookingManager";

const BookingManagerPage: React.FC = () => {
  return (
    <ProfileLayout>
      <BookingManager />
    </ProfileLayout>
  );
};
export default BookingManagerPage;
