import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import MyRoom from "../../components/room/MyRoom";

const MyRoomPage: React.FC = () => {
  return (
    <ProfileLayout>
      <MyRoom />
    </ProfileLayout>
  );
};
export default MyRoomPage;
