import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import CreateMyRoom from "../../components/room/CreateMyRoom";

const CreateMyRoomPage: React.FC = () => {
  return (
    <ProfileLayout>
      <CreateMyRoom />
    </ProfileLayout>
  );
};
export default CreateMyRoomPage;
