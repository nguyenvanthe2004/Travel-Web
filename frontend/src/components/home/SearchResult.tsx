import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { callGetHotelSearch } from "../../services/hotel";
import { toastError } from "../../lib/toast";
import { Hotel } from "../../types/hotel";
import LoadingPage from "../ui/LoadingPage";
import { CLOUDINARY_URL, HotelStatus } from "../../constants";
import {
  BedDouble,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Heart,
  MapPin,
  SearchX,
  Star,
  Users,
} from "lucide-react";
import { getMinPrice } from "../../lib/utils";

const SearchResult: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const locationName = params.get("locationName");
  const guests = Number(params.get("guests"));
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const PRICE_MAP: Record<string, { min: number; max: number }> = {
    "0-100": { min: 0, max: 100 },
    "100-300": { min: 100, max: 300 },
    "300-500": { min: 300, max: 500 },
    "500+": { min: 500, max: 1000 },
    all: { min: 0, max: 1000 },
  };

  const { min: minPrice, max: maxPrice } = PRICE_MAP[priceRange];
  const [sort, setSort] = useState("recommended");

  const fetchHotels = async () => {
    if (!locationName) return;
    try {
      setLoading(true);
      const res = await callGetHotelSearch(
        1,
        4,
        locationName,
        guests,
        minPrice,
        maxPrice,
      );

      setHotels(res.data.data);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [locationName, guests, priceRange]);

  const sortedHotels = useMemo(() => {
    return [...hotels].sort((a, b) => {
      if (sort === "price_asc")
        return getMinPrice(a.rangePrice) - getMinPrice(b.rangePrice);

      if (sort === "price_desc")
        return getMinPrice(b.rangePrice) - getMinPrice(a.rangePrice);

      return 0;
    });
  }, [hotels, sort]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <div className="bg-white:bg-[#1c140d] shadow-sm py-4">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center bg-white:bg-[#2a2018] p-2 rounded-2xl shadow-sm">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 ">
              <span className="material-symbols-outlined text-[#9c7349]">
                <BedDouble />
              </span>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-[#9c7349] uppercase tracking-wider">
                  Destination
                </label>
                <input
                  className="w-full bg-transparent border-none p-0 text-[#1c140d]:text-white font-semibold focus:ring-0 placeholder:text-gray-400"
                  type="text"
                  value={locationName || ""}
                  readOnly
                />
              </div>
            </div>
            {checkIn && checkOut && (
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
                <span className="material-symbols-outlined text-[#9c7349]">
                  <CalendarDays />
                </span>
                <div className="flex flex-col w-full">
                  <label className="text-xs font-semibold text-[#9c7349] uppercase tracking-wider">
                    Dates
                  </label>
                  <input
                    className="w-full bg-transparent border-none p-0 text-[#1c140d]:text-white font-semibold focus:ring-0"
                    value={`${checkIn} -- ${checkOut}`}
                    readOnly
                  />
                </div>
              </div>
            )}
            {guests > 0 && (
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
                <span className="material-symbols-outlined text-[#9c7349]">
                  <Users />
                </span>
                <div className="flex flex-col w-full">
                  <label className="text-xs font-semibold text-[#9c7349] uppercase tracking-wider">
                    Guests
                  </label>
                  <input
                    className="w-full bg-transparent border-none p-0 text-[#1c140d]:text-white font-semibold focus:ring-0"
                    type="text"
                    value={guests}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow max-w-[1280px] mx-auto w-full px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="space-y-4 pb-6 m-2">
              <h3 className="text-base font-semibold text-gray-800:text-white">
                Your budget (per night)
              </h3>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full rounded-lg p-2"
              >
                <option value="all">All prices</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-300">$100 - $300</option>
                <option value="300-500">$300 - $500</option>
                <option value="500+">$500+</option>
              </select>
            </div>
            <div className="space-y-3 pb-6">
              <h3 className="text-base font-bold text-[#1c140d]:text-white">
                Property Rating
              </h3>
              <div className="flex flex-col gap-2">
                {[5, 4, 3].map((star) => (
                  <label
                    key={star}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="size-5 rounded border-[#e8dbce] text-orange-400 focus:ring-orange-400 bg-white dark:bg-[#2a2018] dark:border-[#3a2e25]"
                    />

                    <div className="flex items-center gap-1 text-[#f48c25]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-lg ${
                            i <= star ? "fill-1" : "text-gray-300"
                          }`}
                        >
                          star
                        </span>
                      ))}

                      <span className="ml-2 text-sm font-medium text-[#1c140d]:text-gray-300 group-hover:text-orange-400 transition">
                        {star} Stars
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>
          <div className="col-span-1 lg:col-span-9 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap gap-2 text-sm">
                  <a className="text-[#9c7349] hover:underline" href="/">
                    Home
                  </a>
                  <span className="text-[#9c7349]">/</span>
                  <span className="text-[#1c140d]:text-gray-100 font-medium">
                    {locationName}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#1c140d]:text-white">
                  {locationName || "Location"}: {hotels.length} properties found
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-[#9c7349] whitespace-nowrap">
                  Sort by:
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-white:bg-[#2a2018] text-[#1c140d]:text-white text-sm font-semibold rounded-lg focus:ring-orange-400 focus:border-orange-400 py-2 px-3 pr-8"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="price_desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {sortedHotels.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                    <SearchX />
                  </span>

                  <h3 className="text-xl font-bold text-gray-700">
                    Hotel not found
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Please try again with a different location or number of
                    guests.
                  </p>
                </div>
              ) : (
                sortedHotels.map((hotel) => {
                  if (hotel.status !== HotelStatus.OPEN) return;
                  return (
                    <div
                      key={hotel._id}
                      className="flex flex-col md:flex-row bg-white:bg-[#2a2018] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="relative md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                        <div
                          className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                          data-alt="Modern hotel room with city view through large window"
                        >
                          <img
                            className="w-full h-full"
                            src={`${CLOUDINARY_URL}${hotel.images[0]}`}
                            alt={hotel.name}
                          />{" "}
                        </div>
                        <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-xl">
                            <Heart />
                          </span>
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col md:flex-row p-4 md:p-5 gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-[#1c140d]:text-white leading-tight group-hover:text-orange-400 transition-colors">
                                  {hotel.name}
                                </h3>
                                <div className="flex text-[#f48c25]">
                                  <span className="material-symbols-outlined text-sm fill-1">
                                    <Star />
                                  </span>
                                  <span className="material-symbols-outlined text-sm fill-1">
                                    <Star />
                                  </span>
                                  <span className="material-symbols-outlined text-sm fill-1">
                                    <Star />
                                  </span>
                                  <span className="material-symbols-outlined text-sm fill-1">
                                    <Star />
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[#9c7349] text-sm mt-1">
                                <span className="material-symbols-outlined text-sm">
                                  <MapPin />
                                </span>
                                <span className="truncate">
                                  {hotel.address}, {hotel.locationId.name}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-auto pt-4 text-sm text-[#1c140d]:text-gray-300">
                            <div className="font-bold text-green-600:text-green-400 mb-1">
                              All services included
                            </div>
                            <div className="text-green-600:text-green-400 text-xs">
                              FREE cancellation • No prepayment needed
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col justify-between md:justify-end items-end gap-1 md:w-48 md:border- md:pl-5">
                          <div className="flex flex-col items-end mb-auto md:w-full">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-0.5 transition-colors/10 text-white bg-green-400/90 transition-colors text-xs font-bold rounded">
                                  {hotel.status.toLocaleLowerCase() ===
                                    "open" && "Open"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end mt-4">
                            {hotel.rooms.length ? (
                              <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-2xl font-bold text-text-main text-orange-500">
                                  ${hotel.rangePrice}
                                </span>
                                <span className="text-sm text-gray-400">
                                  / night
                                </span>
                              </div>
                            ) : null}
                            <div className="text-xs text-gray-500:text-gray-400 text-right mb-3">
                              Includes taxes &amp; fees
                              <br />
                              per night
                            </div>
                            <button
                              onClick={() => navigate(`/hotels/${hotel._id}`)}
                              className="bg-orange-400 hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-6 rounded-lg w-full md:w-auto transition-colors flex items-center justify-center gap-2"
                            >
                              View details
                              <span className="material-symbols-outlined text-sm">
                                <ChevronRight size={20} />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {hotels.length > 0 && (
                <div className="flex justify-center mt-8">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-gray-50:hover:bg-[#2a2018] font-bold text-[#1c140d]:text-white transition-colors">
                    Show more results
                    <span className="material-symbols-outlined">
                      <ChevronDown />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
