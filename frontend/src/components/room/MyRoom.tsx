import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  House,
  LandPlot,
  ListFilter,
  MapPin,
  Pencil,
  Plus,
  Trash,
  TriangleRight,
  User,
  Wrench,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  callCountRoomStatus,
  callDeleteRoom,
  callGetAllRooms,
  callGetRoomsByHotelId,
} from "../../services/room";
import { Room } from "../../types/room";
import { useNavigate, useParams } from "react-router-dom";
import { CLOUDINARY_URL, RoomStatus } from "../../constants";
import Pagination from "../ui/Pagination";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import { Hotel } from "../../types/hotel";
import { callGetHotelById } from "../../services/hotel";

type CountByStatus = {
  available: number;
  booked: number;
  maintenance: number;
};
const MyRoom: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomStatus, setRoomStatus] = useState<Room[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | undefined>();
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { isOpen, open, close } = useModal();

  const [countByStatus, setCountByStatus] = useState<CountByStatus>({
    available: 0,
    booked: 0,
    maintenance: 0,
  });
  const navigate = useNavigate();

  const fetchHotelById = async () => {
    if (!hotelId) return;
    try {
      setLoading(true);
      const res = await callGetHotelById(hotelId);
      setHotel(res.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await callGetRoomsByHotelId(page, 10, hotelId);
      setRooms(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCountRoomByStatus = async () => {
    if (!hotelId) return;
    try {
      const data = await callCountRoomStatus(hotelId);
      const result: CountByStatus = {
        available: 0,
        booked: 0,
        maintenance: 0,
      };
      data.forEach((item: { status: RoomStatus; total: number }) => {
        result[item.status] = item.total;
      });

      setCountByStatus(result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const fetchRoomByStatus = async () => {
    try {
      setLoading(true);
      const res = await callGetAllRooms(page, 10, statusFilter, hotelId);
      setRoomStatus(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoomByStatus();
  }, [statusFilter, page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchRooms(), fetchCountRoomByStatus(), fetchHotelById()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, hotelId]);
  const handleDeleteRoom = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await callDeleteRoom(deleteId);
      setDeleteId("");
      close();
      toast.success("Room deleted successfully!");
      fetchRooms();
      fetchCountRoomByStatus();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const totalAllRooms = useMemo(() => {
    return Object.values(countByStatus).reduce((sum, value) => sum + value, 0);
  }, [countByStatus]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] lg:ml-0">
      <div className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 :text-gray-400 mb-6">
              <a
                className="hover:text-[#1B8398] :hover:text-blue-400 flex items-center gap-1 transition-colors"
                onClick={() => navigate("/my-hotel")}
              >
                <span className="material-symbols-outlined text-sm">
                  <House />
                </span>
                My Hotels
              </a>
              <span className="material-symbols-outlined text-xs">
                <ChevronRight />
              </span>
              <span className="font-semibold text-gray-900 :text-gray-100">
                {hotel?.name || "Hotel Name"}
              </span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <a
                    className="h-10 w-10 rounded-lg bg-white :bg-gray-800 shadow-sm border border-gray-200 :border-gray-700 flex items-center justify-center text-gray-700 :text-gray-300 hover:bg-blue-50 :hover:bg-blue-900/20 hover:text-[#1B8398] :hover:text-blue-400 hover:border-blue-300 :hover:border-blue-700 transition-all"
                    onClick={() => navigate("/my-hotel")}
                  >
                    <span className="material-symbols-outlined">
                      <ArrowLeft />
                    </span>
                  </a>
                  <h1 className="text-4xl font-bold text-gray-900 :text-white tracking-tight leading-none">
                    {hotel?.name || "Hotel Name"}
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-gray-600 :text-gray-400">
                  <span className="material-symbols-outlined text-sm">
                    <MapPin />
                  </span>
                  <span className="text-base">
                    {hotel?.locationId?.name || "Location Name"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white :bg-gray-800 border border-gray-300 :border-gray-600 rounded-lg font-semibold text-sm text-gray-700 :text-gray-200 hover:bg-gray-50 :hover:bg-gray-700 hover:border-gray-400 :hover:border-gray-500 transition-all">
                  <span className="material-symbols-outlined text-lg">
                    <ListFilter />
                  </span>
                  Filters
                </button>
                <button
                  onClick={() => navigate(`/my-hotel/${hotelId}/room/create`)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">
                    <Plus />
                  </span>
                  Add New Room
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => {
                  setStatusFilter(undefined);
                  setPage(1);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-md transition-all
                  ${
                    statusFilter === undefined
                      ? "bg-orange-500 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                All Rooms (<span>{totalAllRooms}</span>)
              </button>
              {Object.values(RoomStatus).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setPage(1);
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-md transition-all
                    ${
                      statusFilter === status
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} (
                  {countByStatus[status]})
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <div>Loading...</div>
              ) : (
                rooms
                  .filter(
                    (room) => !statusFilter || room.status === statusFilter,
                  )
                  .map((room) => (
                    <div
                      key={room._id}
                      className={`group bg-white :bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-200 :border-gray-700 ${
                        room.status === RoomStatus.MAINTENANCE
                          ? "opacity-75 hover:opacity-90"
                          : ""
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div
                          className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${CLOUDINARY_URL}/${room.images[0]})`,
                          }}
                        />

                        {room.status === RoomStatus.AVAILABLE && (
                          <div className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                            Available
                          </div>
                        )}

                        {room.status === RoomStatus.BOOKED && (
                          <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                            Booked
                          </div>
                        )}

                        {room.status === RoomStatus.MAINTENANCE && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="bg-gray-800/90 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg flex items-center gap-2">
                              <Wrench className="text-xs" />
                              Maintenance
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className={`text-lg font-bold leading-tight ${
                              room.status === RoomStatus.MAINTENANCE
                                ? "text-gray-500"
                                : "text-gray-900 :text-white"
                            }`}
                          >
                            {room.name}
                          </h3>
                        </div>

                        <p className="flex gap-2 text-sm text-gray-600 :text-gray-400 mb-4 line-clamp-2">
                          <span>
                            <User size={16} className="inline-block mr-0.1" />{" "}
                            {room.maxGuests} guests
                          </span>
                          <span>
                            <TriangleRight
                              size={12}
                              className="inline-block ml-1"
                            />{" "}
                            {room.wide}m²
                          </span>
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-200 :border-gray-700">
                          <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-2xl font-bold text-[#1B8398]">
                              ${room.price}
                            </span>
                            <span className="text-sm text-gray-500 :text-gray-400 font-medium">
                              / night
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/my-hotel/${hotelId}/room/update/${room._id}`,
                                )
                              }
                              disabled={room.status === RoomStatus.MAINTENANCE}
                              className={`flex items-center justify-center p-2 rounded-lg ${
                                room.status === RoomStatus.MAINTENANCE
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-100 :bg-gray-700 text-gray-700 :text-gray-300 hover:bg-orange-50 :hover:bg-orange-900/20 hover:text-[#1B8398]"
                              } transition-all`}
                            >
                              <Pencil className="text-lg" />
                            </button>

                            <button
                              onClick={() => {
                                setDeleteId(room._id);
                                open();
                              }}
                              disabled={room.status === RoomStatus.MAINTENANCE}
                              className={`flex items-center justify-center p-2 rounded-lg ${
                                room.status === RoomStatus.MAINTENANCE
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-100 :bg-gray-700 text-gray-700 :text-gray-300 hover:bg-orange-50 :hover:bg-orange-900/20 hover:text-[#1B8398]"
                              } transition-all`}
                            >
                              <Trash className="text-lg" />
                            </button>

                            <button
                              disabled={room.status === RoomStatus.MAINTENANCE}
                              className={`flex items-center justify-center p-2 rounded-lg ${
                                room.status === RoomStatus.MAINTENANCE
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-orange-600 text-white hover:bg-orange-700"
                              } transition-all`}
                            >
                              <Eye className="text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
              <button
                onClick={() => navigate(`/my-hotel/${hotelId}/room/create`)}
                className="group bg-blue-50 :bg-blue-900/20 border-2 border-dashed border-[#1B8398] :border-[#1B8398] rounded-xl flex flex-col items-center justify-center p-8 hover:bg-blue-100 :hover:bg-blue-900/30 hover:border-blue-400 :hover:border-blue-600 transition-all duration-300 min-h-[350px]"
              >
                <div className="h-16 w-16 rounded-full bg-white :bg-gray-800 shadow-md flex items-center justify-center text-[#1B8398] :text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    <Plus />
                  </span>
                </div>
                <span className="text-[#1B8398] :text-blue-400 font-bold">
                  Add Another Room
                </span>
                <span className="text-sm text-[#1B8398]/70 :text-blue-400/70 mt-1">
                  Quickly expand your inventory
                </span>
              </button>
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleDeleteRoom}
        loading={deleting}
      />
    </div>
  );
};

export default MyRoom;
