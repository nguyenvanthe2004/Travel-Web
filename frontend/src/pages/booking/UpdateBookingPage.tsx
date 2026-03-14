import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import UpdateBooking from "../../components/booking/UpdateBooking";

const UpdateBookingPage: React.FC = () => {
  return (
    <ProfileLayout>
      <UpdateBooking />
    </ProfileLayout>
  );
};
export default UpdateBookingPage;
