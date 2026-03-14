import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { callGetHotelSearch } from "../../services/hotel";
import { toastError } from "../../lib/toast";
import { Hotel } from "../../types/hotel";
import LoadingPage from "../ui/LoadingPage";
import { Range } from "react-range";
import { useDebounce } from "use-debounce";
import { CLOUDINARY_URL, SortValue, HotelStatus } from "../../constants";
import {
  BedDouble,
  ChevronRight,
  Heart,
  MapPin,
  SearchX,
  Star,
  Users,
} from "lucide-react";
import Pagination from "../ui/Pagination";

const STEP = 50;
const MIN = 0;
const MAX = 1000;

export const SortLabel: Record<SortValue, string> = {
  [SortValue.RECOMMENDED]: "Recommended",
  [SortValue.PRICE_ASC]: "Price: Low → High",
  [SortValue.PRICE_DESC]: "Price: High → Low",
};

const SearchResult: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [params] = useSearchParams();
  const locationName = params.get("locationName") || "";
  const guests = Number(params.get("guests"));
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [debouncedPrice] = useDebounce(priceRange, 500);
  const [sort, setSort] = useState(SortValue.RECOMMENDED);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await callGetHotelSearch(
        page,
        5,
        locationName,
        guests,
        debouncedPrice[0],
        debouncedPrice[1],
        sort,
      );
      setTotalPages(res.data.totalPages);
      setHotels(res.data.data);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page, debouncedPrice, sort]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      {!(locationName === "" || !locationName && guests === 1) && (
        <div className="bg-white shadow-sm py-3 md:py-4">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="flex flex-row gap-2 items-center bg-gray-50 p-2 rounded-2xl shadow-sm">
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5">
                <BedDouble size={18} className="text-[#9c7349] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <label className="text-[10px] font-semibold text-[#9c7349] uppercase tracking-wider">
                    Destination
                  </label>
                  <h3>{locationName}</h3>
                </div>
              </div>

              {guests > 0 && (
                <>
                  <div className="w-px h-8 bg-gray-200 shrink-0" />
                  <div className="flex items-center gap-2 px-3 py-1.5 shrink-0">
                    <Users size={18} className="text-[#9c7349] shrink-0" />
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-[#9c7349] uppercase tracking-wider">
                        Guests
                      </label>
                      <span className="text-[#1c140d] font-semibold text-sm">
                        {guests}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto w-full px-4 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="space-y-4 pb-6 border-b border-[#e8dbce]">
              <h3 className="text-base font-bold text-[#1c140d]">
                Your budget (per night)
              </h3>
              <div className="pt-6 px-2">
                <Range
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  values={priceRange}
                  onChange={(values) => {
                    setPriceRange(values);
                    setPage(1);
                  }}
                  renderTrack={({ props, children }) => {
                    const { key, ...rest } = props as any;
                    return (
                      <div
                        key={key}
                        {...rest}
                        className="relative h-1 w-full bg-gray-200 rounded-full"
                      >
                        <div
                          className="absolute h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${((priceRange[1] - priceRange[0]) / MAX) * 100}%`,
                            left: `${(priceRange[0] / MAX) * 100}%`,
                          }}
                        />
                        {children}
                      </div>
                    );
                  }}
                  renderThumb={({ props }) => {
                    const { key, ...rest } = props;
                    return (
                      <div
                        key={key}
                        {...rest}
                        className="w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow cursor-pointer"
                      />
                    );
                  }}
                />
              </div>
              <div className="flex justify-between items-center text-xl font-medium text-[#1c140d] pt-2">
                <span className="px-3 py-1 bg-gray-50 rounded-lg">
                  ${priceRange[0]}
                </span>
                <span className="text-gray-400">-</span>
                <span className="px-3 py-1 bg-gray-50 rounded-lg">
                  ${priceRange[1]}+
                </span>
              </div>
            </div>

            <div className="space-y-3 pb-6">
              <h3 className="text-base font-bold text-[#1c140d]">
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
                      className="size-5 rounded border-[#e8dbce] text-orange-400 focus:ring-orange-400 bg-white"
                    />
                    <div className="flex items-center gap-1 text-[#f48c25]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i <= star
                              ? "fill-[#f48c25] text-[#f48c25]"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-[#1c140d] group-hover:text-orange-400 transition">
                        {star} Stars
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="col-span-1 lg:col-span-9 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              {!(locationName === "") && (
                <div className="flex flex-wrap gap-1.5 text-sm">
                  <Link to={"/"} className="text-[#9c7349] hover:underline">
                    Home
                  </Link>
                  <span className="text-[#1c140d] font-medium">
                    / {locationName}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <h1 className="text-lg md:text-2xl font-bold text-[#1c140d] leading-tight">
                  <span className="hidden sm:inline">{locationName || ""}</span>
                  <span> {hotels.length} Properties Found</span>
                </h1>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="hidden sm:block text-sm font-medium text-[#9c7349] whitespace-nowrap">
                    Sort by:
                  </label>

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortValue)}
                    className="bg-white text-[#1c140d] text-sm font-semibold rounded-lg border border-gray-200 focus:ring-orange-400 focus:border-orange-400 py-2 px-3"
                  >
                    {Object.values(SortValue).map((value) => (
                      <option key={value} value={value}>
                        {SortLabel[value]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              {hotels.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <SearchX size={56} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700">
                    Hotel not found
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm px-4">
                    Please try again with a different location or number of
                    guests.
                  </p>
                </div>
              ) : (
                hotels.map((hotel) => {
                  if (hotel.status !== HotelStatus.OPEN) return null;
                  return (
                    <div
                      key={hotel._id}
                      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="relative sm:w-64 md:w-72 h-52 sm:h-auto shrink-0 overflow-hidden">
                        <img
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          src={`${CLOUDINARY_URL}${hotel.images[0]}`}
                          alt={hotel.name}
                        />
                        <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors">
                          <Heart size={18} />
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col p-4 md:p-5 gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                          <div className="flex-1 flex flex-col gap-2 min-w-0">
                            <div className="w-100">
                              <div className="flex items-start gap-2 flex-wrap">
                                <h3 className="text-base md:text-lg font-bold text-[#1c140d] leading-tight group-hover:text-orange-400 transition-colors">
                                  {hotel.name}
                                </h3>
                                <div className="flex items-center text-[#f48c25] mt-0.5 shrink-0">
                                  {[1, 2, 3, 4].map((i) => (
                                    <Star
                                      key={i}
                                      size={13}
                                      className="fill-[#f48c25]"
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[#9c7349] mt-1">
                                <MapPin size={13} className="shrink-0" />
                                <span className="text-xs md:text-sm truncate">
                                  {hotel.address}, {hotel.locationId.name}
                                </span>
                              </div>
                            </div>

                            <div className="mt-auto pt-2 text-xs md:text-sm">
                              <div className="font-bold text-black-600 mb-0.5">
                                All services included
                              </div>
                              <div className="text-black-600 text-xs">
                                FREE cancellation • No prepayment needed
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row sm:flex-col justify-between sm:justify-end items-end gap-2 sm:gap-1 sm:w-44 sm:border-l sm:border-gray-100 sm:pl-4 shrink-0">
                            <span className="px-2 py-0.5 text-white bg-green-400/90 text-xs font-bold rounded sm:mb-auto">
                              {hotel.status.toUpperCase()}
                            </span>
                            <div className="flex flex-col items-end gap-1">
                              {hotel.rooms.length ? (
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xl md:text-2xl font-bold text-orange-500">
                                    ${hotel.rangePrice}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    /night
                                  </span>
                                </div>
                              ) : null}
                              <div className="text-[10px] text-gray-400 text-right leading-snug mb-2">
                                Includes taxes & fees
                              </div>
                              <button
                                onClick={() => navigate(`/hotels/${hotel._id}`)}
                                className="bg-orange-400 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                              >
                                View details
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
