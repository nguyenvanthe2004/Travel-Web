import React, { useEffect, useState } from "react";

import {
  callCancelBooking,
  callGetBookingsOwner,
} from "../../services/booking";
import { Booking } from "../../types/booking";
import Pagination from "../ui/Pagination";
import { BookingStatus, CLOUDINARY_URL, LIMIT } from "../../constants";
import { Calendar, Eye, MapPin, Moon, Trash2, UsersRound } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { toastError, toastSuccess } from "../../lib/toast";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import { accentBarStyles, formatPrice, statusStyles } from "../../lib/utils";
import LoadingPage from "../ui/LoadingPage";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookingManager: React.FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [activeStatus, setActiveStatus] = useState<BookingStatus>(
    BookingStatus.PENDING,
  );
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();

  const fetchBookingOwner = async () => {
    try {
      setLoading(true);

      const res = await callGetBookingsOwner(page, LIMIT, activeStatus);

      setBookings(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toastError(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await callCancelBooking(deleteId);
      setDeleteId("");
      close();
      toastSuccess("Booking deleted successfully!");
      fetchBookingOwner();
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchBookingOwner();
  }, [page, activeStatus]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 flex flex-col w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 :text-white text-4xl font-extrabold tracking-tight">
                Bookings Manager
              </h1>
              <p className="text-slate-500 :text-slate-400 text-lg">
                Manage and monitor your global booking portfolio from one
                central dashboard.
              </p>
            </div>
          </div>
          <div className="flex gap-10 overflow-x-auto no-scrollbar mt-10 mb-10">
            {Object.values(BookingStatus).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setActiveStatus(status);
                  setPage(1);
                }}
                className={`flex flex-col items-center justify-center pb-2 px-1 min-w-[80px] transition-colors
                  ${
                    activeStatus === status
                      ? "border-b border-orange-400 text-[#1c140d] font-bold"
                      : "text-black hover:text-orange-400"
                  }`}
              >
                <p className="text-sm font-bold tracking-wide capitalize">
                  {status}
                </p>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${accentBarStyles[booking.status]}`}
                />

                <div className="flex flex-col lg:flex-row">
                  <div className="relative w-full lg:w-[200px] shrink-0 overflow-hidden">
                    <div
                      className="bg-center bg-cover w-full h-48 lg:h-full min-h-[160px] group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${CLOUDINARY_URL}${booking.roomId.images[0]})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r" />
                  </div>

                  <div className="flex flex-col flex-1 justify-between p-5 gap-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                          <MapPin size={11} className="shrink-0" />
                          <span className="truncate">
                            {booking.roomId.hotelId.address},{" "}
                            {booking.roomId.hotelId.locationId.name}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-gray-900 leading-snug truncate">
                          {booking.roomId.name}
                        </h3>

                        <p className="text-xs text-gray-400 mt-1 font-mono tracking-wide">
                          #{booking._id.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusStyles[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-400" />
                        <span>
                          {dayjs(booking.checkIn).format("DD MMM YYYY")}
                          <span className="mx-1 text-gray-300">→</span>
                          {dayjs(booking.checkOut).format("DD MMM YYYY")}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <UsersRound size={13} className="text-gray-400" />
                        <span>{booking.guest} guests</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Moon size={13} className="text-gray-400" />
                        <span>{booking.nights} nights</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                          Total
                        </p>
                        <p className="text-xl font-bold text-orange-500 leading-none">
                          {formatPrice(booking.total)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`update/${booking._id}`)}
                          className="flex items-center gap-1.5 px-4 h-8 text-xs font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-200"
                        >
                          <Eye size={13} />
                          View
                        </button>

                        <button
                          onClick={() => {
                            setDeleteId(booking._id);
                            open();
                          }}
                          className="flex items-center gap-1.5 px-4 h-8 text-xs font-semibold rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
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
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleDeleteBooking}
        loading={deleting}
      />
    </div>
  );
};
export default BookingManager;
