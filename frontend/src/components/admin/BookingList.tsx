import React, { useEffect, useState } from "react";
import { Booking, FindBookingStatus } from "../../types/booking";
import { BookingStatus, CLOUDINARY_URL } from "../../constants";
import { Download, Eye, Funnel, List, Pencil, Trash } from "lucide-react";
import CustomTable from "../ui/CustomTable";
import Pagination from "../ui/Pagination";
import {
  callCountBookingStatus,
  callDeleteBooking,
  callGetAllBookings,
} from "../../services/booking";
import { toastError, toastSuccess } from "../../lib/toast";
import { formatPrice } from "../../lib/utils";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [countStatus, setCountStatus] = React.useState<any>(null);
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await callGetAllBookings(page, 10, statusFilter);

      setBookings(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCount = async () => {
    try {
      const res = await callCountBookingStatus();
      setCountStatus(res);
    } catch (error: any) {
      toastError(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchBookings(), fetchCount()]);
      } catch (error: any) {
        toastError(error.message);
      }
    };
    fetchData();
  }, [page, statusFilter]);

  const handleDeleteHotel = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await callDeleteBooking(deleteId);
      setDeleteId("");
      close();
      toastSuccess("Hotel deleted successfully!");
      fetchBookings();
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const bookingColumns = [
    {
      key: "code",
      title: "Booking ID",
      render: (booking: Booking) => (
        <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
          {`BK-${booking._id.slice(-5)}`}
        </span>
      ),
    },

    {
      key: "guest",
      title: "Guest",
      render: (booking: Booking) => (
        <div className="flex items-center gap-3 min-w-[220px]">
          {" "}
          <div
            className="w-9 h-9 rounded-full bg-cover bg-center flex-shrink-0"
            style={{
              backgroundImage: `url(${CLOUDINARY_URL}${booking.userId.avatar})`,
            }}
          />{" "}
          <div className="min-w-0">
            {" "}
            <p className="text-sm font-semibold text-gray-900 truncate">
              {" "}
              {booking.userId.fullName}{" "}
            </p>{" "}
            <p className="text-xs text-gray-400 truncate">
              {booking.userId.email}
            </p>{" "}
          </div>{" "}
        </div>
      ),
    },

    {
      key: "hotel",
      title: "Hotel / Room",
      render: (booking: Booking) => (
        <>
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {booking.roomId?.hotelId?.name}
          </p>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {booking.roomId?.name}
          </p>
        </>
      ),
    },

    {
      key: "period",
      title: "Stay Period",
      render: (booking: Booking) => (
        <>
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {booking.checkIn} - {booking.checkOut}
          </p>
          <p className="text-xs text-gray-400">{booking.nights} Nights</p>
        </>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (booking: Booking) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${
            {
              confirmed: "bg-green-50 text-green-700",
              pending: "bg-amber-50 text-amber-700",
              cancelled: "bg-red-50 text-red-700",
            }[booking.status]
          }`}
        >
          {booking.status.toUpperCase()}
        </span>
      ),
    },

    {
      key: "total",
      title: "Total",
      render: (booking: Booking) => (
        <span className="font-semibold text-gray-900 whitespace-nowrap">
          {formatPrice(booking.total)}
        </span>
      ),
    },

    {
      key: "actions",
      title: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (booking: Booking) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => navigate(`/admin/bookings/update/${booking._id}`)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => {
              setDeleteId(booking._id);
              open();
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <main className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 :text-white tracking-tight">
          Bookings Management
        </h1>
        <p className="text-sm sm:text-base text-gray-500 :text-gray-400 mt-1">
          Real-time overview and control of all guest reservations.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Bookings */}
        <div className="bg-white :bg-gray-900 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 :border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Bookings
            </span>
            <span className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded">
              +12.5%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 :text-white">
            {bookings.length}
          </div>
          <div className="mt-4 h-1.5 w-full bg-gray-100 :bg-gray-800 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-[70%]"></div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white :bg-gray-900 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 :border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Pending Approvals
            </span>
            <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-2 py-1 rounded">
              High Alert
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 :text-white">
            {countStatus?.find(
              (item: FindBookingStatus) => item.status === "pending",
            )?.total ?? 0}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Urgent requests need attention
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white :bg-gray-900 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 :border-gray-800 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <span className="text-red-500 text-xs font-semibold">-2.1%</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 :text-white">
            {formatPrice(
              bookings?.reduce((sum, booking) => sum + booking.total, 0) ?? 0,
            )}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Current month vs last month
          </p>
        </div>
      </div>

      <div className="bg-white :bg-gray-900 rounded-xl shadow-sm border border-gray-200 :border-gray-800 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200 :border-gray-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 sm:mb-0 scrollbar-hide">
            <div
              onClick={() => {
                setStatusFilter(undefined);
                setPage(1);
              }}
              className={`flex px-3 sm:px-4 pb-2 whitespace-nowrap cursor-pointer border-b-2 ${
                !statusFilter
                  ? "border-teal-500 text-gray-900 font-semibold"
                  : "border-transparent text-gray-400 hover:text-teal-500"
              }`}
            >
              <span className="text-sm">All Bookings</span>
            </div>

            {Object.values(BookingStatus).map((status) => (
              <div
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setPage(1);
                }}
                className={`flex px-3 sm:px-4 pb-2 whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
                  statusFilter === status
                    ? "border-teal-500 text-gray-900 font-semibold"
                    : "border-transparent text-gray-400 hover:text-teal-500"
                }`}
              >
                <span className="text-sm capitalize">{status}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
            <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 border border-gray-200 :border-gray-700 rounded-lg text-xs sm:text-sm font-medium text-gray-600 :text-gray-300 hover:bg-gray-50 :hover:bg-gray-800 transition-colors flex-1 sm:flex-initial justify-center">
              <span className="material-symbols-outlined text-base sm:text-lg">
                <Funnel />
              </span>
              <span className="hidden xs:inline">Filter</span>
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 border border-gray-200 :border-gray-700 rounded-lg text-xs sm:text-sm font-medium text-gray-600 :text-gray-300 hover:bg-gray-50 :hover:bg-gray-800 transition-colors flex-1 sm:flex-initial justify-center">
              <span className="material-symbols-outlined text-base sm:text-lg">
                <Download />
              </span>
              <span className="hidden xs:inline">Export</span>
            </button>
          </div>
        </div>

        <CustomTable
          data={bookings}
          loading={loading}
          columns={bookingColumns}
        />
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleDeleteHotel}
        loading={deleting}
      />
    </main>
  );
};

export default BookingList;
