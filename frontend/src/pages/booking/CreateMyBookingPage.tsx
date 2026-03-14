import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CreateMyBooking from "../../components/booking/CreateMyBooking";

const CreateMyBookingPage: React.FC = () => {
  return (
    <HomeLayout>
      <CreateMyBooking />
    </HomeLayout>
  );
};
export default CreateMyBookingPage;
