import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Hotel } from "../../types/hotel";
import { toastError } from "../../lib/toast";
import { callGetAllHotel } from "../../services/hotel";
import LoadingPage from "../ui/LoadingPage";
import { CLOUDINARY_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const HotelCard: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await callGetAllHotel(1, 10);
      setHotels(res.data.data);
    } catch (error: any) {
      toastError(error.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, []);

  const updateItemsPerView = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setItemsPerView(1);
    } else if (width < 1024) {
      setItemsPerView(2);
    } else if (width < 1280) {
      setItemsPerView(3);
    } else {
      setItemsPerView(4);
    }
  };
  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const handleNext = () => {
    if (currentIndex < hotels.length - itemsPerView) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-main">
              Homes guests love
            </h3>
            <p className="text-text-muted mt-2">
              Top rated stays for your next vacation.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="size-10 rounded-full flex items-center justify-center hover:bg-background-light hover:border-primary/50 transition-colors"
            >
              <span className="material-symbols-outlined">
                <ArrowLeft />
              </span>
            </button>
            <button
              onClick={handleNext}
              className="size-10 rounded-full bg-orange-400 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="flex-shrink-0 flex flex-col gap-3 group cursor-pointer"
                style={{ minWidth: `${100 / itemsPerView}%` }}
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={`${CLOUDINARY_URL}/${hotel?.images?.[0]}`}
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-colors text-red-500">
                    <span className="material-symbols-outlined fill text-[20px]">
                      <Heart />
                    </span>
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined fill text-yellow-500 text-[14px]">
                      star
                    </span>
                    4.9
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-lg text-text-main leading-tight group-hover:text-orange-400 transition-colors">
                    {hotel?.name}
                  </h4>
                  <p className="text-sm text-text-muted">
                    {hotel?.locationId?.name}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-bold text-text-main">
                      {hotel.rooms?.[0]?.price?.toLocaleString() || "..."}₫
                    </span>
                    <span className="text-sm text-gray-400">/ night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelCard;
