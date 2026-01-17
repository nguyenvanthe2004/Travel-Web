import type React from "react";
import FeatureCard from "../../components/home/FeatureCard";
import HotelCard from "../../components/home/HotelCard";
import DestinationCard from "../../components/home/DestinationCard";
import SearchBar from "../../components/home/SearchBar";
import HomeLayout from "../../layouts/HomeLayout";
import Newsletter from "../../components/home/Newsletter";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <Header />
      <main className="flex-grow flex flex-col">
        <SearchBar />
        <DestinationCard />
        <HotelCard />
        <FeatureCard />
        <Newsletter />
      </main>
      <Footer />
    </HomeLayout>
  );
};
export default Home;
