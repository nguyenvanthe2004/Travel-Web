import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import {
  callCountHotelStatus,
  callDeleteHotel,
  callGetAllHotel,
  callGetMyHotel,
} from "../../services/hotel";
import { CLOUDINARY_URL, HotelStatus } from "../../constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ArrowRight, Loader, MapPin, Plus, Star, Trash } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import LoadingPage from "../ui/LoadingPage";
import Pagination from "../ui/Pagination";
import { toastError } from "../../lib/toast";
import { HotelStatusBadge } from "../ui/HotelStatusBadge";

type CountByStatus = {
  open: number;
  closed: number;
  renovation: number;
};

const MyHotel: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState("");
  const [statusFilter, setStatusFilter] = useState<HotelStatus | undefined>();
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { isOpen, open, close } = useModal();

  const [countByStatus, setCountByStatus] = useState<CountByStatus>({
    open: 0,
    closed: 0,
    renovation: 0,
  });

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const userId = user.userId;

  const fetchMyHotels = async () => {
    try {
      setLoading(true);
      const res = await callGetMyHotel(1, 10);
      const hotelList = res.data.data;
      setHotels(hotelList);
      setTotal(res.data.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountHotelByStatus = async () => {
    try {
      const data = await callCountHotelStatus();
      const result: CountByStatus = {
        open: 0,
        closed: 0,
        renovation: 0,
      };
      data.forEach((item: { status: HotelStatus; total: number }) => {
        result[item.status] = item.total;
      });

      setCountByStatus(result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchHotelByStatus = async () => {
    try {
      setLoading(true);
      const res = await callGetAllHotel(page, 10, statusFilter);
      setHotels(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toastError(error.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHotelByStatus();
  }, [statusFilter, page]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        await Promise.all([fetchMyHotels(), fetchCountHotelByStatus()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleDeleteHotel = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await callDeleteHotel(deleteId);
      setDeleteId("");
      close();
      toast.success("Hotel deleted successfully!");
      fetchMyHotels();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
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
            <div className="flex border-b border-slate-200 min-w-max">
              <button
                type="button"
                onClick={() => {
                  setStatusFilter(undefined);
                  setPage(1);
                }}
                className={`flex items-center gap-2 border-b-2 px-6 pb-4 pt-2 transition-all
                  ${
                    !statusFilter
                      ? "border-black text-black font-bold"
                      : "border-transparent text-slate-500 hover:text-black"
                  }
                `}
              >
                <span>All Hotel</span>
                <span className="bg-slate-100 text-xs py-0.5 px-2 rounded-full">
                  {total}
                </span>
              </button>
              {Object.values(HotelStatus).map((status) => {
                const isActive = statusFilter === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setPage(1);
                    }}
                    className={`flex items-center gap-2 border-b-2 px-6 pb-4 pt-2 transition-all
                      ${
                        isActive
                          ? "border-black text-black font-bold"
                          : "border-transparent text-slate-500 hover:text-black"
                      }
                    `}
                  >
                    <span>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <span className="bg-slate-100 text-xs py-0.5 px-2 rounded-full">
                      {countByStatus[status]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {hotels[0] && (
            <div className="mb-10 group">
              <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
                <button
                  onClick={() => {
                    setDeleteId(hotels[0]._id);
                    open();
                  }}
                  className="
                  absolute top-4 right-4 z-10
                  p-2.5 rounded-xl
                  opacity-0 group-hover:opacity-100
                  text-slate-400 hover:text-red-500
                  hover:bg-red-50
                  transition-all
                  "
                >
                  <Trash className="w-5 h-5" />
                </button>
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${CLOUDINARY_URL}/${hotels[0].images[0]})`,
                    }}
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 bg-primary/10 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Star className="w-4 h-4 text-amber-400" />
                        Featured Property
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">
                        {hotels[0].name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {hotels[0].address} - {hotels[0].locationId?.name}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                          Rooms
                        </p>
                        <p className="text-lg font-bold text-slate-800">42</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                          Avg. Occupancy
                        </p>
                        <p className="text-lg font-bold text-slate-800">88%</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                          Rating
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="text-lg font-bold text-slate-800">
                            4.9
                          </p>
                          <Star className="w-5 h-5 text-amber-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      <div
                        className="size-8 rounded-full border-2 border-white bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${CLOUDINARY_URL}/${hotels[0].images[1]})`,
                        }}
                      />
                      <div
                        className="size-8 rounded-full border-2 border-white bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${CLOUDINARY_URL}/${hotels[0].images[2]})`,
                        }}
                      />
                      <div className="size-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">
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
                className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                {" "}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${CLOUDINARY_URL}/${hotel.images[0]})`,
                    }}
                  />
                  <button
                    onClick={() => {
                      setDeleteId(hotel._id);
                      open();
                    }}
                    className="
                      absolute top-3 right-3 z-10
                      p-2 rounded-lg
                      bg-white/80 backdrop-blur
                      text-slate-400 hover:text-red-500
                      opacity-0 group-hover:opacity-100
                      transition-all
                    "
                  >
                    <Trash className="w-4 h-4" />
                  </button>

                  <HotelStatusBadge status={hotel.status} />
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {hotel.name}
                    </h4>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hotel.address} - {hotel.locationId?.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Rooms
                      </span>
                      <div className="text-sm font-bold text-slate-700">18</div>
                    </div>

                    <button
                      onClick={() => navigate(`/my-hotel/update/${hotel._id}`)}
                      className="
                        flex items-center gap-1
                        bg-slate-100 hover:bg-orange-500 hover:text-white
                        text-slate-700
                        px-4 py-2 rounded-lg
                        font-bold text-xs transition-all
                      "
                    >
                      Manage
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

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
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleDeleteHotel}
        loading={deleting}
      />
    </div>
  );
};

export default MyHotel;
