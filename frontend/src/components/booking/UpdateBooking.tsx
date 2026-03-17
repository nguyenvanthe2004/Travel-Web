import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Calendar, User, Hotel, BedDouble, Check } from "lucide-react";
import { Booking, UpdateBookingDto } from "../../types/booking";
import { callGetBookingById, callUpdateBooking } from "../../services/booking";
import { BookingStatus, CLOUDINARY_URL } from "../../constants";
import LoadingPage from "../ui/LoadingPage";
import NotFoundPage from "../ui/NotFound";
import { formatPrice, getStatusClass, statusStyles } from "../../lib/utils";
import { toastError, toastSuccess } from "../../lib/toast";
import dayjs from "dayjs";

const UpdateBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<BookingStatus>(BookingStatus.PENDING);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBooking = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data } = await callGetBookingById(id);
      setBooking(data);
      setStatus(data.status);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (id: string, data: UpdateBookingDto) => {
    try {
      await callUpdateBooking(id, data);
      toastSuccess("Update status successfully!");
      navigate("/booking-manager");
    } catch (error: any) {
      toastError(error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  if (loading) return <LoadingPage />;

  if (!booking) return <NotFoundPage />;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-8">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Update Booking
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            View reservation information
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-8">
          {/* Booking ID */}
          <div className="flex justify-between items-center pb-4">
            <div>
              <p className="text-sm text-gray-400">Booking ID</p>
              <p className="text-lg font-bold text-gray-900">{booking._id}</p>
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className={`px-3 uppercase py-1 bg-white rounded-full text-xs outline-none ${statusStyles[status]}`}
            >
              {Object.values(BookingStatus).map((s) => (
                <option key={s} value={s} className={getStatusClass(s)}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Guest */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${CLOUDINARY_URL}${booking.userId.avatar})`,
              }}
            />

            <div>
              <p className="font-semibold text-gray-900 flex items-center gap-2">
                <User size={16} />
                {booking.userId.fullName}
              </p>
              <p className="text-sm text-gray-500">{booking.userId.email}</p>
            </div>
          </div>

          {/* Hotel */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Hotel</p>
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Hotel size={16} />
                {booking.roomId?.hotelId?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Room</p>
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <BedDouble size={16} />
                {booking.roomId?.name}
              </p>
            </div>
          </div>

          {/* Room Image */}
          {booking.roomId?.images?.[0] && (
            <img
              src={`${CLOUDINARY_URL}${booking.roomId.images[0]}`}
              className="w-full h-64 object-cover rounded-xl"
            />
          )}

          {/* Stay Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Check In</p>
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Calendar size={16} />
                {dayjs(booking.checkIn).format("DD MMM YYYY")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Check Out</p>
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Calendar size={16} />
                {dayjs(booking.checkOut).format("DD MMM YYYY")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Nights</p>
              <p className="font-semibold text-gray-800">
                {booking.nights} Nights
              </p>
            </div>
          </div>

          {/* Request */}
          {booking.request && (
            <div>
              <p className="text-sm text-gray-400 mb-1">Special Request</p>
              <p className="text-gray-700 bg-slate-50 p-4 rounded-xl">
                {booking.request}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="pt-6 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Total Payment</p>
            <p className="text-2xl font-bold text-teal-600">
              {formatPrice(booking.total)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={() => handleChangeStatus(booking._id, { status })}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F8FA0] text-white rounded-xl hover:bg-[#0E7A88]"
          >
            <Check size={18} />
            Update Status
          </button>
        </div>
      </div>
    </main>
  );
};

export default UpdateBooking;
