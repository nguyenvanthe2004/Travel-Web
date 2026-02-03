import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import HotelContent from "../../components/hotel/HotelContent";

const HotelPageUser: React.FC = () => {
  return (
    <ProfileLayout>
      <HotelContent />
    </ProfileLayout>
  );
};
export default HotelPageUser;
