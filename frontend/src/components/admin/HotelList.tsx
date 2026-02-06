import React, { useEffect, useState } from "react";
import { Hotel } from "../../types/hotel";
import { CLOUDINARY_URL, HotelStatus } from "../../constants";
import {
  ArrowRight,
  ChevronDown,
  CircleCheck,
  CircleX,
  MapPin,
  Plus,
  Trash,
} from "lucide-react";
import CustomTable from "../ui/CustomTable";
import Pagination from "../ui/Pagination";
import {
  callDeleteHotel,
  callGetAllHotel,
} from "../../services/hotel";
import { toastError } from "../../lib/toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";

const HotelList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [statusFilter, setStatusFilter] = useState<HotelStatus>(
    HotelStatus.OPEN,
  );
  const [allHotel, setAllHotel] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { isOpen, open, close } = useModal();

  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await callGetAllHotel(1, 10, statusFilter);
      setHotels(res.data.data);
      setTotalPages(res.data.totalPages);
      setAllHotel(res.data.data.length);
    } catch (error: any) {
      toastError(error.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, [statusFilter, page]);

  const handleDeleteHotel = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await callDeleteHotel(deleteId);
      setDeleteId("");
      close();
      toast.success("Hotel deleted successfully!");
      fetchHotels();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const hotelColumns = [
    {
      key: "hotel",
      title: "Hotel Details",
      render: (hotel: Hotel) => (
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={`${CLOUDINARY_URL}/${hotel.images[0]}`}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {hotel.name}
            </p>
            <p className="text-xs text-gray-500">
              {hotel.address}, {hotel.locationId?.name}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "location",
      title: "Location",
      render: (hotel: Hotel) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
          <span className="whitespace-nowrap text-xs sm:text-sm">
            {hotel.address}, {hotel.locationId?.name}
          </span>
        </div>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (hotel: Hotel) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase border ${
            {
              [HotelStatus.OPEN]: "bg-green-50 text-green-700 border-green-200",
              [HotelStatus.RENOVATION]:
                "bg-amber-50 text-amber-700 border-amber-200",
              [HotelStatus.CLOSED]: "bg-red-50 text-red-700 border-red-200",
            }[hotel.status]
          }`}
        >
          {hotel.status}
        </span>
      ),
    },

    {
      key: "actions",
      title: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (hotel: Hotel) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => {
              setDeleteId(hotel._id);
              open();
            }}
            className={`p-2.5 rounded-lg transition text-slate-400 hover:text-red-500 hover:bg-red-50`}
          >
            <span className="material-symbols-outlined text-[22px]">
              <Trash />
            </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Hotels Management
          </h1>
          <p className="text-sm text-teal-600 font-medium">
            Oversee 1,284 properties across 24 countries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-3 lg:gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-w-[140px] sm:min-w-[160px]">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide block mb-2">
              All Hotels
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {allHotel}
              </span>
              <span className="text-xs font-semibold text-green-600">+12%</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-w-[140px] sm:min-w-[160px]">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide block mb-2">
              Avg. Occupancy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">72%</span>
              <span className="text-xs font-semibold text-red-500">-2%</span>
            </div>
          </div>

          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Plus />
            <span
              onClick={() => navigate("/hotels/create")}
              className="hidden sm:inline"
            >
              Add New Hotel
            </span>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
            <button
              onClick={() => {
                fetchHotels(); 
              }}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>All Cities</span>

              <ChevronDown className="w-4 h-4 ml-auto" />
            </button>

            <button
              onClick={() => {
                setStatusFilter(HotelStatus.OPEN);
                setPage(1);
              }}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors text-sm font-medium"
            >
              <CircleCheck className="w-4 h-4 text-teal-600" />
              <span>Open</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </button>

            <button
              onClick={() => {
                setStatusFilter(HotelStatus.CLOSED);
                setPage(1);
              }}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors text-sm font-medium"
            >
              <CircleX className="w-4 h-4 text-teal-600" />
              <span>Closed</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </button>

            <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 px-3 py-2">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        data={hotels}
        columns={hotelColumns}
        loading={loading}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Info Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-teal-50 border border-teal-200 rounded-xl relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Needs Attention
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              48 listings are currently pending review or have incomplete
              documentation.
            </p>
            <a
              href="#"
              className="text-teal-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Review listings
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <svg
            className="absolute -bottom-4 -right-4 w-24 h-24 text-teal-100 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Market Trends
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Demand in Southern Europe has increased by 22% this quarter.
            </p>
            <a
              href="#"
              className="text-amber-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View report
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <svg
            className="absolute -bottom-4 -right-4 w-24 h-24 text-amber-100 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              System Status
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Global API and booking synchronization is running optimally.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase text-green-600">
                All Systems Nominal
              </span>
            </div>
          </div>
          <svg
            className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-200 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
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

export default HotelList;
