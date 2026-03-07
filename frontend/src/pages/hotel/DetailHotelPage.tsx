import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import DetailHotel from "../../components/home/DetailHotel";

const HotelDetailPage: React.FC = () => {
  return (
    <HomeLayout>
      <main className="flex-grow flex flex-col">
        <DetailHotel />
      </main>
    </HomeLayout>
  );
};
export default HotelDetailPage;
