import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import UpdateMyRoom from "../../components/room/UpdateMyRoom";

const UpdateRoomPage: React.FC = () => {
  return (
    <ProfileLayout>
      <UpdateMyRoom />
    </ProfileLayout>
  );
};
export default UpdateRoomPage;
