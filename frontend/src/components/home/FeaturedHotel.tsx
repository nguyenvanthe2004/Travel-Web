import { ArrowLeft, ArrowRight, Heart, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Hotel } from "../../types/hotel";
import { toastError } from "../../lib/toast";
import { callGetAllHotel } from "../../services/hotel";
import LoadingPage from "../ui/LoadingPage";
import { CLOUDINARY_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

const FeaturedHotel: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);

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

  if (loading) return <LoadingPage />;

  return (
    <section className="py-12 px-6 bg-white">
      <style>{`
        .swiper { width: 100%; overflow: hidden; }
        .swiper-wrapper { display: flex; flex-direction: row; box-sizing: content-box; }
        .swiper-slide { flex-shrink: 0; height: auto; }
        .swiper-pagination { display: flex; justify-content: center; gap: 6px; margin-top: 16px; }
        .swiper-pagination-bullet { width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; cursor: pointer; transition: background 0.2s; }
        .swiper-pagination-bullet-active { background: #fb923c; }
      `}</style>
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
            <button className="size-10 rounded-full flex items-center justify-center hover:bg-background-light hover:border-primary/50 transition-colors">
              <ArrowLeft />
            </button>
            <button className="size-10 rounded-full bg-orange-400 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20">
              <ArrowRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel._id}>
              <div
                className="flex flex-col gap-3 group cursor-pointer"
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={`${CLOUDINARY_URL}/${hotel.images?.[0]}`}
                    alt={hotel.name}
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-colors text-red-500">
                    <Heart size={20} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                    <span className="text-yellow-500">
                      <Star size={15} style={{ fill: "currentColor" }} />
                    </span>
                    4.9
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-lg text-text-main leading-tight group-hover:text-orange-400 transition-colors">
                    {hotel.name}
                  </h4>
                  <p className="text-sm text-text-muted">
                    {hotel.locationId.name}
                  </p>
                  {hotel.rooms.length ? (
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg font-bold text-text-main">
                        $ {hotel.rangePrice}
                      </span>
                      <span className="text-sm text-gray-400">/ night</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedHotel;
