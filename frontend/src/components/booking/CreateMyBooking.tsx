import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CLOUDINARY_URL, RoomStatus } from "../../constants";
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  ConciergeBell,
  CreditCard,
  LockKeyhole,
  MapPin,
  User,
} from "lucide-react";
import { formatPrice } from "../../lib/utils";
import { toastError, toastSuccess } from "../../lib/toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { callCreateBooking } from "../../services/booking";
import dayjs from "dayjs";

const CreateMyBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const { room, checkIn, checkOut, guest, nights, total } =
    location.state || {};

  const handelBookingSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await callCreateBooking({
        roomId: room._id,
        info: `${fullName} - ${phone}`,
        nights,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guest,
        request,
        total,
      });
      toastSuccess("Create Booking Successfully!");
      navigate(
        `/hotels/${room.hotelId._id}/room/${room._id}/booking/${data._id}/payment`,
        {
          state: {
            room,
            total
          },
        },
      );
    } catch (error: any) {
      navigate("/login");
      toastError("You need to log in to use the service!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow layout-container px-4 md:px-10 lg:px-40 py-8">
      <div className="layout-content-container max-w-[1200px] mx-auto">
        <nav className="mb-8 flex flex-wrap items-center gap-3 text-sm font-medium">
          <div
            onClick={() =>
              navigate(`/hotels/${room.hotelId._id}/room/${room._id}`)
            }
            className="flex items-center gap-2 text-gray-500 hover:text-orange-400 transition cursor-pointer group"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 group-hover:bg-orange-400 group-hover:text-white text-xs transition">
              1
            </span>
            <span className="group-hover:text-orange-400 transition">
              {room.name}
            </span>
          </div>
          <span className="material-symbols-outlined text-gray-400 text-lg">
            <ChevronRight />
          </span>
          <div className="flex items-center gap-2 text-orange-400">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-400 text-white text-xs">
              2
            </span>
            <span>Your Booking</span>
          </div>
          <span className="material-symbols-outlined text-gray-400 text-lg">
            <ChevronRight />
          </span>
          <div className="flex items-center gap-2 text-gray-500 hover:text-orange-400 transition cursor-pointer group">
            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 group-hover:border-orange-400 group-hover:text-orange-400 text-xs transition">
              3
            </span>
            <span className="group-hover:text-orange-400 transition">
              Confirmation
            </span>
          </div>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-[#1c140d]:text-white tracking-tight">
                Confirm and Pay
              </h1>
              <p className="text-gray-500:text-gray-400 mt-1">
                Please fill in your details to complete the booking.
              </p>
            </div>
            <section className="bg-white:bg-[#2a2018] rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-orange-400 text-2xl">
                  <User />
                </span>
                <h3 className="text-xl font-bold">Guest Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-xs font-semibold uppercase tracking-widest transition-all duration-200">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                    placeholder="e.g. John"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700:text-gray-300">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                    placeholder="john@example.com"
                    type="email"
                    value={user.email}
                    readOnly
                  />
                  <p className="text-xs text-gray-500">
                    Booking confirmation will be sent here.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700:text-gray-300">
                    Phone Number
                  </label>
                  <div className="flex">
                    <input
                      className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                      placeholder="0123456789"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white:bg-[#2a2018] rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-400 text-2xl">
                    <ConciergeBell />
                  </span>
                  <h3 className="text-xl font-bold">Special Requests</h3>
                </div>
                <span className="text-xs font-medium bg-gray-100:bg-gray-800 text-gray-600:text-gray-400 px-2 py-1 rounded">
                  Optional
                </span>
              </div>
              <p className="text-sm text-gray-500:text-gray-400 mb-4">
                Special requests cannot be guaranteed - but the property will do
                its best to meet your needs.
              </p>
              <textarea
                className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                placeholder="e.g. Early check-in, quiet room, airport transfer..."
                onChange={(e) => setRequest(e.target.value)}
                rows={3}
              ></textarea>
            </section>
            <button
              onClick={handelBookingSubmit}
              className="w-full bg-orange-400 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-orange-200:shadow-none transition-all mt-4 flex justify-center items-center gap-2"
            >
              Complete Booking
              <span className="material-symbols-outlined">
                <ArrowRight />
              </span>
            </button>
            <p className="text-center text-xs text-gray-400:text-gray-500 mt-2">
              By clicking "Complete Booking", you agree to our{" "}
              <a className="underline hover:text-orange-400" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline hover:text-orange-400" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sticky top-24">
            <div className="group relative bg-white w-[380px] rounded-2xl shadow-md border border-orange-100 mx-auto">
              {/* Image Section */}
              <div className="relative h-52 w-full overflow-hidden">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${CLOUDINARY_URL}${room.images[0]})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <svg
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-stone-800">5.0</span>
                </div>

                {/* Status badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {RoomStatus.AVAILABLE.toUpperCase()}
                </div>

                {/* Room name on image */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                  <h3 className="text-white text-lg font-bold leading-tight drop-shadow-md">
                    {room.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="px-4 py-4 space-y-4">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                  <MapPin className="w-4 h-4 shrink-0 text-amber-500" />
                  <span className="truncate">
                    {room.hotelId.address}, {room.hotelId.locationId.name}
                  </span>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Check-in / Check-out */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 rounded-xl px-3 py-2.5">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-1">
                      Check-in
                    </p>
                    <p className="text-sm font-semibold text-stone-800">
                      {dayjs(checkIn).format("DD MMM YYYY")}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      After 8:00 PM
                    </p>
                  </div>

                  <div className="bg-stone-50 rounded-xl px-3 py-2.5 text-right">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-1">
                      Check-out
                    </p>
                    <p className="text-sm font-semibold text-stone-800">
                      {dayjs(checkOut).format("DD MMM YYYY")}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Before 12:00 AM
                    </p>
                  </div>
                </div>

                {/* Guest */}
                <div className="flex items-center gap-2.5 bg-amber-50 rounded-xl px-3 py-2.5">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <User className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Guests</p>
                    <p className="text-sm font-semibold text-stone-700">
                      {guest} {guest > 1 ? "Guests" : "Guest"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-4 w-1 rounded-full bg-orange-400"></div>
                <h4 className="font-bold text-base tracking-wide text-[#1c140d] uppercase">
                  Price Details
                </h4>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    Base Rate ({nights} nights)
                  </span>
                  <span className="font-semibold text-[#1c140d]">
                    {formatPrice(room.price * nights)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Taxes & Fees</span>
                  <span className="text-green-400/100">Free</span>
                </div>
              </div>

              <div className="border-t border-dashed border-orange-200 my-4"></div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Total
                  </p>
                  <p className="text-3xl font-extrabold text-[#1c140d]">
                    {formatPrice(total)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Includes all taxes and fees
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs font-semibold text-orange-500 tracking-wide">
                    Best Price
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50:bg-blue-900/10 rounded-xl p-4 border border-blue-100:border-blue-900/30">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-blue-600:text-blue-400">
                  <CalendarCheck />
                </span>
                <div>
                  <p className="text-sm font-bold text-blue-900:text-blue-100">
                    Free Cancellation
                  </p>
                  <p className="text-xs text-blue-700:text-blue-300 mt-0.5">
                    Free cancellation before booking confirmation. No hidden
                    fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateMyBooking;
