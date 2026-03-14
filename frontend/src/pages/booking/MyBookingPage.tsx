import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import MyBooking from "../../components/booking/MyBooking";

const MyBookingPage: React.FC = () => {
  return (
    <HomeLayout>
      <MyBooking />
    </HomeLayout>
  );
};
export default MyBookingPage;
