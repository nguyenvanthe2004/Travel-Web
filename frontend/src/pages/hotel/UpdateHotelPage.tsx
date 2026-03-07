import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import UpdateMyHotel from "../../components/hotel/UpdateMyHotel";

const UpdateHotelPage: React.FC = () => {
  return (
    <ProfileLayout>
      <UpdateMyHotel />
    </ProfileLayout>
  );
};
export default UpdateHotelPage;
