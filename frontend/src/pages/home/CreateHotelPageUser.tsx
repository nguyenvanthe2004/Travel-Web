import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import CreateHotel from "../../components/hotel/CreateHotel";

const CreateHotelPageUser: React.FC = () => {
  return (
    <ProfileLayout>
      <CreateHotel />
    </ProfileLayout>
  );
};
export default CreateHotelPageUser;
