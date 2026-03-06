import React, { useEffect, useState } from "react";
import { Room } from "../../types/room";
import { useNavigate, useParams } from "react-router-dom";
import { callGetRoomById } from "../../services/room";
import { toastError } from "../../lib/toast";
import LoadingPage from "../ui/LoadingPage";
import { CLOUDINARY_URL, RoomStatus } from "../../constants";
import {
  BedDouble,
  Clock,
  Coffee,
  Eye,
  MapPin,
  Martini,
  Monitor,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Star,
  Sun,
  Users,
  Wifi,
} from "lucide-react";

const DetailRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const navigate = useNavigate();

  const fetchRoomById = async () => {
    if (!roomId) return;
    try {
      setLoading(true);
      const res = await callGetRoomById(roomId);
      setRoom(res.data);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoomById();
  }, [roomId]);

  if (!room) return null;
  const images = room.images || [];
  const formatPrice = (price: number): string => {
    return `$${price?.toLocaleString("en-US") || "0"}`;
  };
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = end.getTime() - start.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = getNights();
  const serviceFee = 80;
  const total = nights * room.price + serviceFee;

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <nav className="flex flex-wrap gap-2 items-center text-sm mb-6">
        <a
          className="text-text-sec-light:text-text-sec-dark hover:underline hover:text-orange-400 transition-colors cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </a>
        <span className="text-text-sec-light:text-text-sec-dark">/</span>
        <a
          onClick={() => navigate(`/hotels/${room.hotelId?._id}`)}
          className="font-semibold text-text-main-light:text-text-main-dark hover:underline hover:text-orange-400 transition-colors cursor-pointer"
        >
          {room.hotelId?.name || "Hotel Details"}
        </a>
        <span className="text-text-sec-light:text-text-sec-dark">/</span>
        <span className="font-semibold text-text-main-light:text-text-main-dark">
          {room.name || "Room Details"}
        </span>
      </nav>
      <section className="mb-8 rounded-2xl overflow-hidden shadow-sm">
        {images.length === 1 && (
          <div className="h-[350px] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${CLOUDINARY_URL}${images[0]})` }}
            />
          </div>
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-3 h-[400px]">
            {images.map((img, index) => (
              <div key={index} className="overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                  style={{ backgroundImage: `url(${CLOUDINARY_URL}${img})` }}
                />
              </div>
            ))}
          </div>
        )}

        {images.length === 3 && (
          <div className="grid grid-cols-2 gap-3 h-[400px]">
            <div className="row-span-2 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[0]})`,
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[1]})`,
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[2]})`,
                }}
              />
            </div>
          </div>
        )}

        {images.length >= 4 && (
          <div className="grid grid-cols-4 gap-3 h-[450px]">
            <div className="col-span-2 row-span-2 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: `url(${CLOUDINARY_URL}${images[0]})`,
                }}
              />
            </div>

            {images.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="overflow-hidden relative group/img cursor-pointer"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover/img:scale-105"
                  style={{ backgroundImage: `url(${CLOUDINARY_URL}${img})` }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-400/10 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-2 py-1 rounded">
                Executive Choice
              </span>
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    <Star className="w-[18px] h-[18px] fill-orange-400 text-orange-400" />
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 :text-slate-100 mb-6">
              {room.name}
            </h2>
            <p className="text-lg text-slate-600 :text-slate-400 leading-relaxed max-w-2xl">
              {room.description}
            </p>
          </section>
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-orange-400/10">
            <div className="flex flex-col gap-1">
              <span className="material-symbols-outlined text-orange-400 mb-2">
                <Scan />
              </span>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-tighter">
                Room Size
              </span>
              <span className="font-bold">{room.wide} m²</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="material-symbols-outlined text-orange-400 mb-2">
                <BedDouble />
              </span>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-tighter">
                Bed Type
              </span>
              <span className="font-bold">King Size</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="material-symbols-outlined text-orange-400 mb-2">
                <Users />
              </span>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-tighter">
                Max Guests
              </span>
              <span className="font-bold">{room.maxGuests} Adults</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="material-symbols-outlined text-orange-400 mb-2">
                <Eye />
              </span>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-tighter">
                Floor View
              </span>
              <span className="font-bold">Ocean Front</span>
            </div>
          </section>
          <section>
            <h3 className="text-2xl font-bold mb-8">What this room offers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-orange-400/5 flex items-center justify-center group-hover:bg-orange-400/10 transition-colors">
                  <span className="material-symbols-outlined text-orange-400">
                    <Wifi />
                  </span>
                </div>
                <span className="font-medium">High-speed WiFi</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-orange-400/5 flex items-center justify-center group-hover:bg-orange-400/10 transition-colors">
                  <span className="material-symbols-outlined text-orange-400">
                    <Snowflake />
                  </span>
                </div>
                <span className="font-medium">Climate Control</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-orange-400/5 flex items-center justify-center group-hover:bg-orange-400/10 transition-colors">
                  <span className="material-symbols-outlined text-orange-400">
                    <Monitor />
                  </span>
                </div>
                <span className="font-medium">65" Smart TV</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-orange-400/5 flex items-center justify-center group-hover:bg-orange-400/10 transition-colors">
                  <span className="material-symbols-outlined text-orange-400">
                    <Martini />
                  </span>
                </div>
                <span className="font-medium">Premium Mini Bar</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-orange-400/5 flex items-center justify-center group-hover:bg-orange-400/10 transition-colors">
                  <span className="material-symbols-outlined text-orange-400">
                    <Sun />
                  </span>
                </div>
                <span className="font-medium">Private Balcony</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-orange-400/5 flex items-center justify-center group-hover:bg-orange-400/10 transition-colors">
                  <span className="material-symbols-outlined text-orange-400">
                    <Coffee />
                  </span>
                </div>
                <span className="font-medium">Nespresso Machine</span>
              </div>
            </div>
          </section>
          <section className="bg-orange-400/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Room Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-orange-400">
                    <Clock />
                  </span>
                  <div>
                    <p className="font-bold">Check-in / Check-out</p>
                    <p className="text-sm text-slate-600 :text-slate-400">
                      Check-in from 14:00 PM
                      <br />
                      Check-out by 24:00 AM
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-orange-400">
                    <ShieldAlert />
                  </span>
                  <div>
                    <p className="font-bold">Cancellation</p>
                    <p className="text-sm text-slate-600 :text-slate-400">
                      Free cancellation up to 48 hours before check-in.
                      Non-refundable after that.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white :bg-slate-900 rounded-3xl p-8 border border-orange-400/10 shadow-xl shadow-orange-400/5">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-3xl font-extrabold text-orange-400">
                  {formatPrice(room.price)}
                </span>
                <span className="text-slate-500 font-medium">/ night</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm shadow-slate-200/80 divide-y divide-slate-100">
                <div className="grid grid-cols-2 divide-x divide-slate-100">
                  <div className="p-4 hover:bg-orange-50/60 cursor-pointer transition-colors group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1.5">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="font-semibold text-sm text-slate-700 outline-none bg-transparent w-full cursor-pointer"
                    />
                  </div>
                  <div className="p-4 hover:bg-orange-50/60 cursor-pointer transition-colors group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1.5">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="font-semibold text-sm text-slate-700 outline-none bg-transparent w-full cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 hover:bg-orange-50/60 cursor-pointer transition-colors">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1.5">
                    Guests
                  </label>
                  <select className="w-full font-semibold text-sm text-slate-700 bg-transparent outline-none cursor-pointer">
                    {Array.from({ length: room.maxGuests || 0 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Adult{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between text-sm px-1">
                <span className="text-slate-500">
                  {nights} nights × {formatPrice(room.price)}
                </span>
                <span className="font-bold">
                  {formatPrice(nights * room.price)}
                </span>
              </div>
              <div className="flex justify-between text-sm px-1">
                <span className="text-slate-500">Service fee</span>
                <span className="font-bold">{formatPrice(serviceFee)}</span>
              </div>
              <div className="pt-4 border-t border-slate-200 :border-slate-700 flex justify-between px-1">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold text-lg">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <button className="w-full bg-orange-400 text-white font-extrabold py-4 rounded-2xl hover:bg-orange-400/90 transition-all shadow-lg shadow-orange-400/20 transform active:scale-[0.98] mb-4">
              Reserve Now
            </button>
            <p className="text-center text-xs text-slate-400">
              You won't be charged yet
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-sm">
              <ShieldCheck />
            </span>
            <span className="text-xs font-semibold">Best Price Guarantee</span>
          </div>
        </div>
      </div>
      <section className="mt-24 mb-16">
        <h3 className="text-2xl font-bold mb-8">Related Rooms</h3>
        {room.hotelId?.rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {room.hotelId?.rooms.slice(0, 3).map(
              (r) =>
                r.status === RoomStatus.AVAILABLE &&
                r._id !== room._id && (
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        data-alt="Garden Deluxe room interior"
                        style={{
                          backgroundImage: `url(${CLOUDINARY_URL}${r.images[0]})`,
                        }}
                      ></div>
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold">
                        From {formatPrice(r.price)}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg">{r.name}</h4>

                    <p className="text-sm text-slate-500">
                      The rooms have all the entertainment facilities
                    </p>
                  </div>
                ),
            )}
          </div>
        )}
      </section>
    </div>
  );
};
export default DetailRoom;
