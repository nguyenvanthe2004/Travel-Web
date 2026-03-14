import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { callCancelBooking, callGetMyBookings } from "../../services/booking";
import { Booking } from "../../types/booking";
import Pagination from "../ui/Pagination";
import { BookingStatus, CLOUDINARY_URL } from "../../constants";
import { Calendar, UsersRound } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { toastError, toastSuccess } from "../../lib/toast";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import { formatPrice, statusStyles } from "../../lib/utils";
import LoadingPage from "../ui/LoadingPage";

const MyBooking: React.FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingStatus>(
    BookingStatus.PENDING,
  );
  const [totalPages, setTotalPages] = useState(1);
  const [activeStatus, setActiveStatus] = useState<BookingStatus>(
    BookingStatus.PENDING,
  );
  const [cancelId, setCancelId] = useState("");
  const [canceling, setCanceling] = useState(false);
  const { isOpen, open, close } = useModal();

  const user = useSelector((state: RootState) => state.auth.currentUser);

  const fetchMyBooking = async () => {
    try {
      setLoading(true);
      const res = await callGetMyBookings(page, 5, statusFilter);
      setBookings(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelId) return;
    try {
      setCanceling(true);
      await callCancelBooking(cancelId);
      setCancelId("");
      close();
      toastSuccess("Booking canceled successfully!");
      fetchMyBooking();
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setCanceling(false);
    }
  };

  useEffect(() => {
    fetchMyBooking();
  }, [page, statusFilter]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex-1 max-w-[1280px] w-full mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-[#1c140d]:text-white text-2xl md:text-3xl font-bold">
          Welcome back, {user.fullName}! 👋
        </h1>
        <p className="text-[#9c7349]:text-gray-400 mt-1">
          Great experience with TravelStay.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 flex flex-col w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#1c140d]:text-white">
              My Bookings
            </h2>
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {Object.values(BookingStatus).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setActiveStatus(status);
                    setStatusFilter(status);
                    setPage(1);
                  }}
                  className={`flex flex-col items-center justify-center pb-2 px-1 min-w-[80px] transition-colors
                  ${
                    activeStatus && statusFilter === status
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
          </div>
          <div className="flex flex-col gap-6 ">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group bg-surface-light:bg-surface rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-md transition-shadow mb-10"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full md:w-[240px] shrink-0">
                    <div
                      className="bg-center bg-no-repeat bg-cover rounded-lg aspect-video md:aspect-[4/3] h-full"
                      data-alt="Luxurious hotel bedroom with a view of the Eiffel Tower in Paris"
                      style={{
                        backgroundImage: `url(${CLOUDINARY_URL}${booking.roomId.images[0]})`,
                      }}
                    >
                      <div className="m-2 inline-flex">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded shadow-sm ${
                            statusStyles[booking.status]
                          }`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[#9c7349]:text-orange-400 text-sm font-medium mb-1">
                            {booking.roomId.hotelId.address},{" "}
                            {booking.roomId.hotelId.locationId.name}
                          </p>
                          <h3 className="text-[#1c140d]:text-white text-xl font-bold leading-tight">
                            {booking.roomId.name}
                          </h3>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-500:text-gray-400">
                            Booking ID:
                          </p>
                          <p className="text-sm font-mono text-[#1c140d]:text-gray-300">
                            {booking._id}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#1c140d]:text-gray-300">
                        <div className="flex items-center gap-1.5 bg-background-light:bg-white/5 px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[18px] text-[#9c7349]:text-gray-400">
                            <Calendar />
                          </span>
                          <span className="font-medium">
                            {booking.checkIn} - {booking.checkOut}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-background-light:bg-white/5 px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[18px] text-[#9c7349]:text-gray-400">
                            <UsersRound />
                          </span>
                          <span className="font-medium">{booking.guest}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl md:text-2xl font-bold text-orange-500">
                          {formatPrice(booking.total)}
                        </span>
                        <span className="text-xs text-gray-400">
                          /{booking.nights} nights
                        </span>
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        {booking.status === BookingStatus.PENDING && (
                          <button
                            onClick={() => {
                              setCancelId(booking._id);
                              open();
                            }}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-6 rounded-xl 
                          bg-red-50 text-red-600 border border-red-200 
                          hover:bg-red-600 hover:text-white hover:border-red-600
                          text-sm font-semibold shadow-sm hover:shadow-md 
                          transition-all duration-200 active:scale-95"
                          >
                            Cancel Booking
                          </button>
                        )}
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
        onConfirm={handleCancelBooking}
        loading={canceling}
        title="Cancel Item"
        description="Are you sure you want to cancel this item? This action cannot be undone."
        confirmText="Cancel"
      />
    </div>
  );
};
export default MyBooking;
