import {
  ChevronRight,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BookingStatus,
  PaymentStatus,
  PUSHER_KEY,
  SEPAY_URL,
} from "../../constants";
import Pusher, { Channel } from "pusher-js";
import { formatPrice } from "../../lib/utils";
import { PaymentEvent } from "../../types/booking";

const ConfirmPayment: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { room, total } = location.state || {};

  const [paid, setPaid] = useState(false);

  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    if (!pusherRef.current) {
      pusherRef.current = new Pusher(PUSHER_KEY, {
        cluster: "ap1",
        forceTLS: true,
      });
    }

    const channel = pusherRef.current.subscribe(`payment-${bookingId}`);
    channelRef.current = channel;

    const handler = (data: PaymentEvent) => {
      if (data.bookingId === bookingId && data.status === PaymentStatus.PAID) {
        setPaid(true);
      }
    };

    channel.bind("payment-success", handler);

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind("payment-success", handler);
        pusherRef.current?.unsubscribe(`payment-${bookingId}`);
        channelRef.current = null;
      }
    };
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <nav className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() =>
              navigate(`/hotels/${room?.hotelId?._id}/room/${room?._id}`)
            }
            className="flex items-center gap-2 group"
          >
            <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-400 text-xs font-semibold flex items-center justify-center group-hover:bg-orange-400 group-hover:text-white transition-all duration-200">
              1
            </span>
            <span className="text-sm text-gray-400 group-hover:text-orange-400 transition-colors duration-200">
              {room?.name || "Room Details"}
            </span>
          </button>

          <ChevronRight className="w-4 h-4 text-gray-300" />

          <button
            onClick={() =>
              navigate(
                `/hotels/${room?.hotelId?._id}/room/${room?._id}/booking`,
                { state: { room, total } },
              )
            }
            className="flex items-center gap-2 group"
          >
            <span className="w-7 h-7 rounded-full border border-gray-300 text-gray-400 text-xs font-semibold flex items-center justify-center group-hover:border-orange-400 group-hover:text-orange-400 transition-all duration-200">
              2
            </span>
            <span className="text-sm text-gray-400 group-hover:text-orange-400 transition-colors duration-200">
              Your Booking
            </span>
          </button>

          <ChevronRight className="w-4 h-4 text-gray-300" />

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-orange-400 text-white text-xs font-semibold flex items-center justify-center shadow-sm shadow-orange-200">
              3
            </span>
            <span className="text-sm font-semibold text-orange-500">
              Confirmation
            </span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-5">
            {!paid ? (
              <>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800 leading-tight">
                        Scan to Pay
                      </h1>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Use your banking app to scan the QR code below
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                      Total Amount
                    </span>
                    <span className="text-4xl font-bold text-gray-800">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="w-full h-px bg-stone-100" />

                  <div className="relative">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 opacity-70 blur-md" />
                    <div className="relative bg-white rounded-xl p-4 border border-orange-100 shadow-md">
                      <img
                        src={`${SEPAY_URL}amount=${total}&des=${bookingId}`}
                        alt="Payment QR Code"
                        className="w-52 h-52 object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400">
                      Booking Reference
                    </span>
                    <span className="font-mono text-sm font-semibold text-gray-600 bg-stone-50 px-3 py-1 rounded-lg border border-stone-200">
                      {bookingId}
                    </span>
                  </div>

                  <ol className="w-full space-y-2.5 text-sm text-gray-500">
                    {[
                      "Open your bank's mobile app",
                      "Select 'Scan QR Code' or 'Transfer'",
                      "Scan the code above and confirm payment",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-400 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                  Your payment information is encrypted and 100% secure.
                </div>
              </>
            ) : (
              <div className="relative bg-emerald-50/40 rounded-2xl border border-emerald-100 flex flex-col items-center gap-6 px-8 py-12 animate-[fadeInUp_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center shadow-xl shadow-emerald-100">
                    <CheckCircle2
                      className="w-12 h-12 text-emerald-500"
                      strokeWidth={1.6}
                    />
                  </div>
                  <span className="absolute -top-1 -right-1 text-yellow-400">
                    <Sparkles className="w-6 h-6" />
                  </span>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Payment Successful!
                  </h2>
                  <p className="text-sm text-gray-400 mt-1.5">
                    Your booking has been confirmed and is ready.
                  </p>
                </div>

                <div className="w-full bg-white border border-emerald-100 rounded-2xl px-6 py-5 text-center">
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">
                    Amount Paid
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {formatPrice(total)}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xs text-gray-400">
                    Booking Reference
                  </span>
                  <span className="font-mono text-sm font-semibold text-gray-600 bg-white border border-stone-200 px-4 py-1.5 rounded-lg">
                    {bookingId}
                  </span>
                </div>

                <div className="w-full h-px bg-emerald-100" />
                <button
                  onClick={() => navigate("/my-booking")}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors duration-200 shadow-md shadow-emerald-100"
                >
                  View My Booking
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-2">
                <LockKeyhole className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">
                  Order Summary
                </span>
              </div>

              <div className="px-5 py-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Room</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {room?.name ?? "—"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-stone-100" />

                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Room rate</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Service fee</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-stone-100 my-1" />
                  <div className="flex justify-between font-bold text-gray-800 text-base">
                    <span>Total</span>
                    <span
                      className={paid ? "text-emerald-500" : "text-orange-500"}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Payment status badge */}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                    paid
                      ? "bg-emerald-50 border border-emerald-100 text-emerald-600"
                      : "bg-amber-50 border border-amber-100 text-amber-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      paid ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                    }`}
                  />
                  {paid ? "Payment received" : "Awaiting payment…"}
                </div>
              </div>
            </div>

            {!paid && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
                <span className="font-semibold">Note:</span> Please complete
                your payment to confirm the reservation. Your booking will be
                held until payment is received.
              </div>
            )}

            <p className="text-center text-xs text-gray-400">
              Having trouble?{" "}
              <a
                href="mailto:support@hotel.com"
                className="text-orange-400 hover:underline font-medium"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
