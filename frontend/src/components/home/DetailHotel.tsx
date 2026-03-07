import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import { callGetHotelById } from "../../services/hotel";
import { toastError } from "../../lib/toast";
import LoadingPage from "../ui/LoadingPage";
import { CLOUDINARY_URL, RoomStatus } from "../../constants";
import {
  Dumbbell,
  Eclipse,
  Fullscreen,
  MapPin,
  Snowflake,
  SquareParking,
  Star,
  User,
  Utensils,
  Van,
  WavesLadder,
  Wifi,
} from "lucide-react";
import NotFoundPage from "../ui/NotFound";

const DetailHotel: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchHotelById = async () => {
    if (!hotelId) return null;
    try {
      setLoading(true);
      const res = await callGetHotelById(hotelId);
      setHotel(res.data);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHotelById();
  }, [hotelId]);

  const images = hotel?.images || [];

  if (loading) return <LoadingPage />;

  if (!hotel) return <NotFoundPage />;

  return (
    <div className="flex-grow w-full max-w-[1200px] mx-auto px-4 lg:px-8 py-6">
      <nav className="flex flex-wrap gap-2 items-center text-sm mb-6">
        <a
          className="text-text-sec-light:text-text-sec-dark hover:underline hover:text-orange-400 transition-colors"
          href="#"
          onClick={() => navigate("/")}
        >
          Home
        </a>
        <span className="text-text-sec-light:text-text-sec-dark">/</span>
        <span className="font-semibold text-text-main-light:text-text-main-dark">
          {hotel?.name || "Hotel Details"}
        </span>
      </nav>
      <section className="mb-8 rounded-2xl overflow-hidden shadow-sm">
        {images.length === 1 && (
          <div className="h-[350px] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${CLOUDINARY_URL}${images[0]})` }}
            />
          </div>
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-3 h-[400px]">
            {images.map((img, index) => (
              <div key={index} className="overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                  style={{ backgroundImage: `url(${CLOUDINARY_URL}${img})` }}
                />
              </div>
            ))}
          </div>
        )}

        {images.length === 3 && (
          <div className="grid grid-cols-2 gap-3 h-[400px]">
            <div className="row-span-2 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[0]})`,
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[1]})`,
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[2]})`,
                }}
              />
            </div>
          </div>
        )}

        {images.length >= 4 && (
          <div className="grid grid-cols-4 gap-3 h-[450px]">
            <div className="col-span-2 row-span-2 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[0]})`,
                }}
              />
            </div>

            {images.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="overflow-hidden relative group/img cursor-pointer"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover/img:scale-105"
                  style={{ backgroundImage: `url(${CLOUDINARY_URL}${img})` }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <div className="grid grid-cols-1 gap-8 relative">
        <div className="flex flex-col gap-10">
          <section>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2 py-1 transition-colors/10 text-orange-400 transition-colors text-xs font-bold rounded uppercase tracking-wide">
                  Top Rated
                </span>
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      <Star className="w-[18px] h-[18px] fill-orange-400 text-orange-400" />
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-text-main-light:text-text-main-dark tracking-tight">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-1 text-text-sec-light:text-text-sec-dark text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">
                  <MapPin />
                </span>
                <span className="underline hover:text-orange-400 transition-colors cursor-pointer">
                  {hotel.address + ", " + hotel.locationId.name}
                </span>
              </div>
            </div>
            <p className="text-base text-text-sec-light:text-text-sec-dark leading-relaxed">
              {hotel.description}
            </p>
          </section>
          <section>
            <h3 className="text-xl font-bold mb-4">Popular Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <WavesLadder />
                </span>
                <span className="text-sm font-medium">Infinity Pool</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <Wifi />
                </span>
                <span className="text-sm font-medium">Free WiFi</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <Eclipse />
                </span>
                <span className="text-sm font-medium">Luxury Spa</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <Utensils />
                </span>
                <span className="text-sm font-medium">Restaurant</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <Dumbbell />
                </span>
                <span className="text-sm font-medium">Gym</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <Snowflake />
                </span>
                <span className="text-sm font-medium">Air Conditioning</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <SquareParking />
                </span>
                <span className="text-sm font-medium">Free Parking</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border-border-light:border-border-dark bg-surface-light:bg-surface-dark">
                <span className="material-symbols-outlined text-orange-400 transition-colors">
                  <Van />
                </span>
                <span className="text-sm font-medium">Airport Shuttle</span>
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold mb-6">Available Rooms</h3>
            <div className="flex flex-col gap-6">
              {hotel.rooms.map((room) => {
                if (room.status !== RoomStatus.AVAILABLE) return null;
                return (
                  <div
                    key={room._id}
                    className="flex flex-col md:flex-row bg-surface-light:bg-surface-dark rounded-xl border-border-light:border-border-dark overflow-hidden shadow-sm transition-shadow"
                  >
                    <div
                      className="w-full md:w-1/3 bg-cover bg-center min-h-[200px] bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                      data-alt="Luxurious suite with private jacuzzi and ocean view"
                      style={{
                        backgroundImage: `url(${CLOUDINARY_URL}${room.images[0]})`,
                      }}
                    ></div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold">{room.name}</h4>
                          <span className="px-2 py-0.5 transition-colors/10 text-white bg-green-400/90 transition-colors text-xs font-bold rounded">
                            {room.status.toLocaleLowerCase() === "available" &&
                              "Available"}
                          </span>
                        </div>
                        <ul className="text-sm text-text-sec-light:text-text-sec-dark space-y-1 mb-4">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">
                              <User />
                            </span>{" "}
                            {room.maxGuests} Guests
                          </li>

                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">
                              <Fullscreen />
                            </span>{" "}
                            {room.wide} m²
                          </li>
                          <div className="flex -space-x-2">
                            <div
                              className="size-8 rounded-full border-2 border-white :border-slate-900 bg-cover bg-center cursor-pointer"
                              style={{
                                backgroundImage: `url(${CLOUDINARY_URL}${room.images[1]})`,
                              }}
                            ></div>
                            <div
                              className="size-8 rounded-full border-2 border-white :border-slate-900 bg-cover bg-center cursor-pointer"
                              style={{
                                backgroundImage: `url(${CLOUDINARY_URL}${room.images[2]})`,
                              }}
                            ></div>
                            <div className="size-8 rounded-full border-2 border-white :border-slate-900 bg-slate-100 :bg-slate-800 flex items-center justify-center text-[10px] font-bold cursor-pointer">
                              {"+" + (room.images.length - 3)}
                            </div>
                          </div>
                        </ul>
                      </div>
                      <div className="flex items-end justify-between border-border-light:border-border-dark pt-4 mt-2">
                        <div>
                          <p className="text-2xl font-bold text-orange-400 transition-colors">
                            ${room.price.toLocaleString()}
                            <span className="text-sm font-medium text-text-main-light:text-text-main-dark">
                              / night
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/hotels/${hotel._id}/room/${room._id}`)
                          }
                          className="bg-orange-400 transition-colors hover:bg-orange-600 transition-colors-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold mb-6">Guest Reviews</h3>
            <div className="flex flex-col md:flex-row gap-8 mb-8 bg-surface-light:bg-surface-dark p-6 rounded-2xl border-border-light:border-border-dark">
              <div className="flex flex-col gap-2 min-w-[140px]">
                <p className="text-orange-400 transition-colors text-5xl font-black leading-none tracking-tight">
                  9.2
                </p>
                <p className="text-text-main-light:text-text-main-dark font-bold">
                  Exceptional
                </p>
                <p className="text-text-sec-light:text-text-sec-dark text-sm">
                  Based on 1,204 reviews
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24">Cleanliness</span>
                  <div className="h-2 flex-1 bg-border-light:bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 transition-colors w-[96%]"></div>
                  </div>
                  <span className="text-sm font-bold">9.6</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24">Staff</span>
                  <div className="h-2 flex-1 bg-border-light:bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 transition-colors w-[94%]"></div>
                  </div>
                  <span className="text-sm font-bold">9.4</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24">Comfort</span>
                  <div className="h-2 flex-1 bg-border-light:bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 transition-colors w-[92%]"></div>
                  </div>
                  <span className="text-sm font-bold">9.2</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24">Facilities</span>
                  <div className="h-2 flex-1 bg-border-light:bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 transition-colors w-[88%]"></div>
                  </div>
                  <span className="text-sm font-bold">8.8</span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-surface-light:bg-surface-dark p-5 rounded-xl border-border-light:border-border-dark">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gray-200:bg-gray-700 bg-cover bg-center"
                    data-alt="Portrait of a smiling woman"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBX2KUcTkcLWhO8wDNfavsDROsVSQrxawVHxS3EdkhjW7iH5l9ZJb-4aBcBv0gKDL0Xh_5bwg3zlUZiHxxP4uLmqRH_eZiz5EIGv9RYvJHJDZjTBg7ZGwgcdo_jq0xT9p5Jy7Yal69BGv5vEP8eeyEWKILe7I8SfMRftBspNPSu0N73fCoBInHYhybEL4GEA8feGtwVMD47hHpl8d12dHFRKtud_fUDoLByTsVYie4PKlxO7_M2vWKhcJvHWCodC0hlla4Oin6zcbY")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold text-sm">Sarah Jenkins</p>
                    <p className="text-xs text-text-sec-light:text-text-sec-dark">
                      United Kingdom
                    </p>
                  </div>
                  <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">
                    10.0
                  </span>
                </div>
                <p className="text-sm text-text-main-light:text-text-main-dark">
                  "Absolutely stunning views! The staff went above and beyond to
                  make our anniversary special. The breakfast spread was
                  incredible."
                </p>
              </div>
              <div className="bg-surface-light:bg-surface-dark p-5 rounded-xl border-border-light:border-border-dark">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200:bg-gray-700 flex items-center justify-center text-gray-500 font-bold">
                    MJ
                  </div>
                  <div>
                    <p className="font-bold text-sm">Michael Jones</p>
                    <p className="text-xs text-text-sec-light:text-text-sec-dark">
                      USA
                    </p>
                  </div>
                  <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">
                    9.0
                  </span>
                </div>
                <p className="text-sm text-text-main-light:text-text-main-dark">
                  "Great location and beautiful rooms. The pool area gets a bit
                  crowded in the afternoon but otherwise perfect."
                </p>
              </div>
            </div>
          </section>
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4">Hotel Policies</h3>
            <div className="bg-surface-light:bg-surface-dark rounded-xl border-border-light:border-border-dark overflow-hidden">
              <div className="flex border-border-light:border-border-dark last:border-0">
                <div className="w-32 md:w-48 bg-background-light:bg-background-dark p-4 text-sm font-semibold text-text-sec-light:text-text-sec-dark flex items-center">
                  Check-in
                </div>
                <div className="p-4 text-sm flex-1 flex items-center">
                  From 14:00
                </div>
              </div>
              <div className="flex border-border-light:border-border-dark last:border-0">
                <div className="w-32 md:w-48 bg-background-light:bg-background-dark p-4 text-sm font-semibold text-text-sec-light:text-text-sec-dark flex items-center">
                  Check-out
                </div>
                <div className="p-4 text-sm flex-1 flex items-center">
                  Until 24:00
                </div>
              </div>
              <div className="flex border-b border-border-light:border-border-dark last:border-0">
                <div className="w-32 md:w-48 bg-background-light:bg-background-dark p-4 text-sm font-semibold text-text-sec-light:text-text-sec-dark flex items-center">
                  Cancellation
                </div>
                <div className="p-4 text-sm flex-1 flex items-center text-green-600:text-green-400 font-medium">
                  Free cancellation until 48 hours before arrival
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default DetailHotel;
