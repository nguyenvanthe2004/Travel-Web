import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import { callCountHotelStatus, callGetMyHotel } from "../../services/hotel";
import { CLOUDINARY_URL, HotelStatus } from "../../constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ArrowRight, Loader, MapPin, Plus, Star } from "lucide-react";
import { useModal } from "../../hooks/useModal";

const MyHotel: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, open, close } = useModal();

  const [countByStatus, setCountByStatus] = useState<
    Record<HotelStatus, number>
  >({
    [HotelStatus.OPEN]: 0,
    [HotelStatus.CLOSED]: 0,
    [HotelStatus.RENOVATION]: 0,
  });

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const userId = user.userId;

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await callGetMyHotel(1, 10);
      const hotelList = res.data.data;
      setHotels(hotelList);
      setTotal(hotelList.length);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userId) fetchHotels();
  }, [userId]);

  const fetchCountHotelByStatus = async () => {
    try {
      setLoading(true);

      const [open, closed, renovation] = await Promise.all([
        callCountHotelStatus(HotelStatus.OPEN),
        callCountHotelStatus(HotelStatus.CLOSED),
        callCountHotelStatus(HotelStatus.RENOVATION),
      ]);

      setCountByStatus({
        [HotelStatus.OPEN]: open.data.total,
        [HotelStatus.CLOSED]: closed.data.total,
        [HotelStatus.RENOVATION]: renovation.data.total,
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountHotelByStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <span className="material-symbols-outlined animate-spin text-4xl">
          <Loader />
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] lg:ml-0">
      <div className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 :text-white text-4xl font-extrabold tracking-tight">
                My Hotel
              </h1>
              <p className="text-slate-500 :text-slate-400 text-lg">
                Manage and monitor your global hotel portfolio from one central
                dashboard.
              </p>
            </div>
            <button
              onClick={() => navigate("/my-hotel/create")}
              className="flex items-center gap-2 min-w-[140px] cursor-pointer justify-center overflow-hidden rounded-xl h-12 px-6 bg-orange-500 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              <span className="material-symbols-outlined text-[20px]">
                <Plus />
              </span>
              <span>Add New Hotel</span>
            </button>
          </div>
          <div className="mb-8 overflow-x-auto">
            <div className="flex border-b border-slate-200 :border-slate-700 min-w-max">
              <a
                className="flex items-center gap-2 border-b-2 border-primary text-slate-900 :text-white px-6 pb-4 pt-2 font-bold transition-all"
                href="#"
              >
                <span>All Hotel</span>
                <span className="bg-slate-100 :bg-slate-800 text-xs py-0.5 px-2 rounded-full">
                  {total}
                </span>
              </a>
              <a
                className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 :hover:text-slate-300 px-6 pb-4 pt-2 font-semibold transition-all"
                href="#"
              >
                <span>Open</span>
                <span className="bg-slate-100 :bg-slate-800 text-xs py-0.5 px-2 rounded-full">
                  {countByStatus.open}
                </span>
              </a>
              <a
                className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 :hover:text-slate-300 px-6 pb-4 pt-2 font-semibold transition-all"
                href="#"
              >
                <span>Renovation</span>
                <span className="bg-slate-100 :bg-slate-800 text-xs py-0.5 px-2 rounded-full">
                  {countByStatus.renovation}
                </span>
              </a>
              <a
                className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 :hover:text-slate-300 px-6 pb-4 pt-2 font-semibold transition-all"
                href="#"
              >
                <span>Closed</span>
                <span className="bg-slate-100 :bg-slate-800 text-xs py-0.5 px-2 rounded-full">
                  {countByStatus.closed}
                </span>
              </a>
            </div>
          </div>
          {hotels[0] && (
            <div className="mb-10 group">
              <div className="relative overflow-hidden rounded-2xl bg-white :bg-slate-900 border border-slate-200 :border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-700"
                    data-alt="Modern luxury beach resort with infinity pool"
                    style={{
                      backgroundImage: `url(${CLOUDINARY_URL}/${hotels[0].images[0]})`,
                    }}
                  ></div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 bg-primary/10 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <span className=" text-amber-400 material-symbols-outlined text-[14px]">
                          <Star />
                        </span>
                        Featured Property
                      </div>
                      <span className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-xs font-bold">
                        <span className="size-2 bg-accent-green rounded-full"></span>
                        Active
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 :text-white mb-1">
                        {hotels[0].name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500 :text-slate-400">
                        <span className="material-symbols-outlined text-sm">
                          <MapPin />
                        </span>
                        <span className="text-sm font-medium">
                          {hotels[0].address} - {hotels[0].locationId?.name}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-y border-slate-100 :border-slate-800 py-4">
                      <div>
                        <p className="text-xs text-slate-400 :text-slate-500 uppercase font-bold tracking-widest">
                          Rooms
                        </p>
                        <p className="text-lg font-bold text-slate-800 :text-slate-200">
                          42
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 :text-slate-500 uppercase font-bold tracking-widest">
                          Avg. Occupancy
                        </p>
                        <p className="text-lg font-bold text-slate-800 :text-slate-200">
                          88%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 :text-slate-500 uppercase font-bold tracking-widest">
                          Rating
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="text-lg font-bold text-slate-800 :text-slate-200">
                            4.9
                          </p>
                          <span className="material-symbols-outlined text-amber-400 text-[18px] fill-current">
                            <Star />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      <div
                        className="size-8 rounded-full border-2 border-white :border-slate-900 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${CLOUDINARY_URL}/${hotels[0].images[1]})`,
                        }}
                      ></div>
                      <div
                        className="size-8 rounded-full border-2 border-white :border-slate-900 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${CLOUDINARY_URL}/${hotels[0].images[2]})`,
                        }}
                      ></div>
                      <div className="size-8 rounded-full border-2 border-white :border-slate-900 bg-slate-100 :bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        +5
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/my-hotel/update/${hotels[0]._id}`)
                      }
                      className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                    >
                      Manage Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white :bg-slate-900 rounded-2xl border border-slate-200 :border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Rustic cozy lodge in the snow-capped mountains"
                    style={{
                      backgroundImage: `url(${CLOUDINARY_URL}/${hotel.images[0]})`,
                    }}
                  ></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-green/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Open
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-slate-900 :text-white mb-1">
                      {hotel.name}
                    </h4>
                    <p className="text-slate-500 :text-slate-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        <MapPin />
                      </span>
                      {hotel.address} - {hotel.locationId?.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 :border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 :text-slate-500 uppercase tracking-tighter">
                        Rooms
                      </span>
                      <span className="text-sm font-bold text-slate-700 :text-slate-300">
                        18 Units
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/my-hotel/update/${hotel._id}`)}
                      className="flex items-center gap-1 bg-slate-100 :bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 :text-slate-300 px-4 py-2 rounded-lg font-bold text-xs transition-all"
                    >
                      <span>Manage</span>
                      <span className="material-symbols-outlined text-[16px]">
                        <ArrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 rounded-2xl bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Portfolio Value
              </p>
              <p className="text-2xl font-black">$42.8M</p>
            </div>
            <div className="relative">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Monthly Revenue
              </p>
              <p className="text-2xl font-black text-primary">$1.2M</p>
            </div>
            <div className="relative">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Total Guests
              </p>
              <p className="text-2xl font-black">12.4k</p>
            </div>
            <div className="relative">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Avg Rating
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-black">4.7</p>
                <div className="flex text-amber-400">
                  <span className="material-symbols-outlined text-[18px] fill-current">
                    <Star />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHotel;
