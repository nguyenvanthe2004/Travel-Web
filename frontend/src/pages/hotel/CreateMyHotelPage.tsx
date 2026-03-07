import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import CreateMyHotel from "../../components/hotel/CreateMyHotel";

const CreateMyHotelPage: React.FC = () => {
  return (
    <ProfileLayout>
      <CreateMyHotel />
    </ProfileLayout>
  );
};
export default CreateMyHotelPage;
