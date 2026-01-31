import React, { useState } from "react";
import { IHotel } from "../../types/hotel";
import { HotelStatus } from "../../constants";

import { List, Pencil, Plus } from "lucide-react";
import CustomTable from "../ui/CustomTable";
import Pagination from "../ui/Pagination";

const HotelList: React.FC = () => {
  const [page, setPage] = useState(1);

  const fakeHotels: IHotel[] = [
    {
      _id: "1",
      name: "The Grand Azure",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      city: "Paris",
      country: "France",
      price: 420,
      status: HotelStatus.ACTIVE,
    },
    {
      _id: "2",
      name: "Seaside Sanctuary",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
      city: "Santorini",
      country: "Greece",
      price: 310,
      status: HotelStatus.PENDING,
    },
    {
      _id: "3",
      name: "Urban Edge Loft",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      city: "Tokyo",
      country: "Japan",
      price: 185,
      status: HotelStatus.MAINTENANCE,
    },
  ];

  const hotelColumns = [
    {
      key: "hotel",
      title: "Hotel Details",
      render: (row: IHotel) => (
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={row.image}
              alt={row.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {row.name}
            </p>
            <p className="text-xs text-gray-500">
              {row.city}, {row.country}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "location",
      title: "Location",
      render: (row: IHotel) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <svg
            className="w-4 h-4 text-teal-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="whitespace-nowrap text-xs sm:text-sm">
            {row.city}, {row.country}
          </span>
        </div>
      ),
    },

    {
      key: "price",
      title: "Price / Night",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (row: IHotel) => (
        <p className="text-sm font-semibold text-gray-900">
          ${row.price.toFixed(2)}
        </p>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (row: IHotel) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase border ${
            {
              [HotelStatus.ACTIVE]:
                "bg-green-50 text-green-700 border-green-200",
              [HotelStatus.PENDING]:
                "bg-amber-50 text-amber-700 border-amber-200",
              [HotelStatus.MAINTENANCE]:
                "bg-red-50 text-red-700 border-red-200",
            }[row.status]
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "actions",
      title: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: () => (
        <div className="flex items-center justify-end gap-1">
          <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg">
            <span className="material-symbols-outlined text-[22px]"><Pencil /></span>
          </button>
          <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg">
            <List />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
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
              Active Hotels
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">1,284</span>
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
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <Plus />
            </svg>
            <span className="hidden sm:inline">Add New Hotel</span>
            <span className="sm:hidden">Add Hotel</span>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
            <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>All Cities</span>
              <svg
                className="w-4 h-4 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Active</span>
              <svg
                className="w-4 h-4 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Price Range</span>
              <svg
                className="w-4 h-4 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 px-3 py-2">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        data={fakeHotels}
        columns={hotelColumns}
        loading={false}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
      />

      <Pagination currentPage={page} totalPages={128} onPageChange={setPage} />

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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
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
    </main>
  );
};

export default HotelList;
