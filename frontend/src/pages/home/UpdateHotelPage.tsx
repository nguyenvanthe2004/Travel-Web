import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import UpdateHotel from "../../components/hotel/UpdateHotel";

const UpdateHotelPage: React.FC = () => {
  return (
    <ProfileLayout>
      <UpdateHotel />
    </ProfileLayout>
  );
};
export default UpdateHotelPage;
