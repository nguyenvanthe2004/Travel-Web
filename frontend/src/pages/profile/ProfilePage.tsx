import type React from "react";
import ProfileLayout from "../../layouts/ProfileLayout";
import ProfileContent from "../../components/profile/ProfileContent";

const Profile: React.FC = () => {
  return (
    <ProfileLayout>
      <ProfileContent />
    </ProfileLayout>
  );
};
export default Profile;
