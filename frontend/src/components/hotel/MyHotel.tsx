import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import {
  callCountHotelStatus,
  callDeleteHotel,
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
import NotFoundPage from "../ui/NotFound";

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

  const fetchHotelByStatus = async () => {
    try {
      setLoading(true);
      const res = await callGetMyHotel(page, 10, statusFilter);
      setHotels(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCountHotelByStatus = async () => {
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
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        await Promise.all([fetchHotelByStatus(), fetchCountHotelByStatus()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, statusFilter, page]);

  const handleDeleteHotel = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await callDeleteHotel(deleteId);
      setDeleteId("");
      close();
      toast.success("Hotel deleted successfully!");
      fetchHotelByStatus();
      fetchCountHotelByStatus();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };
  const totalAllHotels = useMemo(() => {
    return Object.values(countByStatus).reduce((sum, value) => sum + value, 0);
  }, [countByStatus]);

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
                  {totalAllHotels}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.length === 0 ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <NotFoundPage />
              </div>
            ) : (
              hotels.map((hotel) => (
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
                        <div className="text-sm font-bold text-slate-700">
                          {hotel.rooms?.length || 0}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                        <button
                          onClick={() =>
                            navigate(`/my-hotel/update/${hotel._id}`)
                          }
                          className="
                        flex items-center gap-1
                        bg-slate-100 hover:bg-orange-500 hover:text-white
                        text-slate-700
                        px-4 py-2 rounded-lg
                        font-bold text-xs transition-all
                      "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/my-hotel/${hotel._id}/room`)
                          }
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
                </div>
              ))
            )}
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
