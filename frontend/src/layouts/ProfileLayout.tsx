import SideBar from "../components/profile/SideBar";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-[#1c140d] dark:text-[#fcfaf8]">
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        {children}
      </div>
    </div>
  );
};
export default ProfileLayout;
