import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CLOUDINARY_URL, RoomStatus } from "../../constants";
import {
  ArrowRight,
  BookText,
  CalendarCheck,
  ChevronRight,
  ConciergeBell,
  CreditCard,
  DollarSign,
  IdCard,
  LockKeyhole,
  MapPin,
  MessageCircleQuestionMark,
  User,
  Wallet,
} from "lucide-react";
import { formatPrice } from "../../lib/utils";
import { toastError, toastSuccess } from "../../lib/toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { callCreateBooking } from "../../services/booking";

const CreateMyBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [request, setRequest] = useState("");

  const user = useSelector((state: RootState) => state.auth.currentUser);

  const { room, checkIn, checkOut, guest, nights, total } =
    location.state || {};

  const handelBookingSubmit = async () => {
    try {
      const res = await callCreateBooking({
        roomId: room._id,
        nights,
        checkIn,
        checkOut,
        guest,
        request,
        total,
      });
      toastSuccess("Create Booking Successfully!")
      navigate("/my-booking");
    } catch (error: any) {
      toastError(error.message);
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
                    value={user.fullName}
                    readOnly
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
                      value={user.phone}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="rounded text-orange-400 focus:ring-orange-400 border-gray-300 bg-gray-50:bg-[#1f1610]:border-gray-600 size-4"
                  id="booking-others"
                  type="checkbox"
                />
                <label
                  className="text-sm text-gray-700:text-gray-300 select-none"
                  htmlFor="booking-others"
                >
                  I am booking for someone else
                </label>
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
            <section className="bg-white:bg-[#2a2018] rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-orange-400 text-2xl">
                  <CreditCard />
                </span>
                <h3 className="text-xl font-bold">Payment Method</h3>
              </div>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-400/10 border-2 border-orange-400 text-orange-400 font-bold whitespace-nowrap transition-colors">
                  <span className="material-symbols-outlined">
                    <CreditCard />
                  </span>
                  Credit Card
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-50:bg-[#1f1610] border-2 border-transparent text-gray-600:text-gray-400 hover:bg-gray-100:hover:bg-[#342a22] font-medium whitespace-nowrap transition-colors">
                  <span className="material-symbols-outlined">
                    <Wallet />
                  </span>
                  PayPal
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-50:bg-[#1f1610] border-2 border-transparent text-gray-600:text-gray-400 hover:bg-gray-100:hover:bg-[#342a22] font-medium whitespace-nowrap transition-colors">
                  <span className="material-symbols-outlined">
                    <DollarSign />
                  </span>
                  Apple Pay
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700:text-gray-300">
                    Name on Card
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                      placeholder="0123456789"
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                      <IdCard />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700:text-gray-300">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 opacity-50">
                      <span className="material-symbols-outlined text-gray-600">
                        <BookText />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700:text-gray-300">
                      Expiry Date
                    </label>
                    <input
                      className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                      placeholder="MM/YY"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700:text-gray-300 flex justify-between">
                      CVV
                      <span
                        className="material-symbols-outlined text-gray-400 text-sm cursor-help"
                        title="3 digits on back of card"
                      >
                        <MessageCircleQuestionMark />
                      </span>
                    </label>
                    <input
                      className="w-full rounded-xl px-4 py-3 text-sm text-[#1c140d] outline-none transition-all duration-200"
                      placeholder="123"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 p-3 bg-green-50:bg-green-900/20 rounded-lg text-green-700:text-green-300 text-sm">
                  <span className="material-symbols-outlined icon-fill">
                    <LockKeyhole />
                  </span>
                  Your payment information is encrypted and secure.
                </div>
              </div>
            </section>
            <button onClick={handelBookingSubmit} className="w-full bg-orange-400 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-orange-200:shadow-none transition-all mt-4 flex justify-center items-center gap-2">
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
            <div className="bg-white:bg-[#2a2018] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="relative h-48 w-full">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover"
                  data-alt="Luxury pool view at Grand Hyatt Bali at sunset"
                  style={{
                    backgroundImage: `url(${CLOUDINARY_URL}${room.images})`,
                  }}
                ></div>
                <div className="absolute top-3 left-3 bg-white/90:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined icon-fill text-yellow-500 text-sm">
                    star
                  </span>
                  5.0
                </div>
                <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  {RoomStatus.AVAILABLE.toUpperCase()}
                </div>
              </div>
              <div className="pt-5">
                <h3 className="text-xl font-bold text-[#1c140d]:text-white leading-tight mb-1">
                  {room.name}
                </h3>
                <p className="text-gray-500:text-gray-400 text-sm mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    <MapPin />
                  </span>
                  {room.hotelId.address}, {room.hotelId.locationId.name}
                </p>
                <hr className="border-gray-100:border-gray-700 my-4" />
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500:text-gray-400 text-xs uppercase font-bold tracking-wider">
                      Check-in
                    </p>
                    <p className="font-medium">{checkIn}</p>
                    <p className="text-xs text-gray-400">After 8:00 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500:text-gray-400 text-xs uppercase font-bold tracking-wider">
                      Check-out
                    </p>
                    <p className="font-medium">{checkOut}</p>
                    <p className="text-xs text-gray-400">Before 12:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50:bg-[#1f1610] rounded-lg">
                  <span className="material-symbols-outlined text-gray-400 mt-0.5">
                    <User />
                  </span>
                  <div>
                    <p className="text-l text-gray-500:text-gray-400">
                      {guest} Guest
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
                  <span className="font-semibold text-[#1c140d]">$45.00</span>
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
