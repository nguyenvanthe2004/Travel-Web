import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import DetailRoom from "../../components/home/DetailRoom";

const RoomDetailPage: React.FC = () => {
  return (
    <HomeLayout>
      <main className="flex-grow flex flex-col">
        <DetailRoom />
      </main>
    </HomeLayout>
  );
};
export default RoomDetailPage;
