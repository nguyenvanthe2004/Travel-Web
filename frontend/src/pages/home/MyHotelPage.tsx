import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import MyHotel from "../../components/hotel/MyHotel";

const MyHotelPage: React.FC = () => {
  return (
    <ProfileLayout>
      <MyHotel />
    </ProfileLayout>
  );
};
export default MyHotelPage;
