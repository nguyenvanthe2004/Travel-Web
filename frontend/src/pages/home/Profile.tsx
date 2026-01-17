import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import MainContent from "../../components/profile/MainContent";
import SideBar from "../../components/profile/SideBar";

const Profile: React.FC = () => {
  return (
    <ProfileLayout>
      <SideBar />
      <MainContent />
    </ProfileLayout>
  );
};
export default Profile;
