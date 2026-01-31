import React from "react";
import { Booking } from "../../types/booking";
import { BookingStatus } from "../../constants";
import { Download, Eye, Funnel, List } from "lucide-react";
import CustomTable from "../ui/CustomTable";
import Pagination from "../ui/Pagination";

const BookingList: React.FC = () => {
  const [page, setPage] = React.useState(1);

  const fakeBookings: Booking[] = [
    {
      _id: "1",
      bookingCode: "#BK-9821",
      guest: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDuGgi3dqmjdM5l11SF4LvI3bPtGo7wsKY41_1OT8VpkwdUDOMnfOLGGeQPP3sy_o5edE4p40UPErVlriAqeQibqerPN1A9yvAr8mY2daQHw7F_ALijmPoS_YFeo4OnKsgHMCjayQNb7NxG0pzYSrXoVLeijIAEY7y2djFx6krL5th2l2Kw4f2WRqllNLo2F7IX6SRkjh-y9aKCo9cemPnoqr_qsVikEDxo_6dtUk2R0t78VNUYynCRCXk-BBlq5ldZDKnWi67Gl9g",
      },
      hotel: "Grand Azure Resort",
      room: "Deluxe Sea View, Rm 402",
      period: "Oct 12 - Oct 15",
      nights: 3,
      status: BookingStatus.CONFIRMED,
      total: 840,
    },
    {
      _id: "2",
      bookingCode: "#BK-9819",
      guest: {
        name: "Michael Chen",
        email: "m.chen@outlook.com",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAtIZbQKsYS7TZbu16Jf13LcFh37papXW4-ie30nzebSkMp7AGbJlTVat-1UaiAO9fhBEmDw8wNF3USZ7JLfi1y5IQWbi094RHUzy_OmumQaldP95Ijb0ulFMAT7GCuqFr_R-9zUqJaVWrRDb1DG_ZidUPDKN3PPlO5NU7h30byo-JKm4eY44KkYj3AIc1-k_ipjbzVoalxx3qq8_fPXlTOhkyempbx1CALo5DO9tl9iuaOm1kFjrRTKKKhz1ziWxheNoIDw-mfL8Q",
      },
      hotel: "City Palace Hotel",
      room: "Business Suite, Rm 1012",
      period: "Oct 14 - Oct 16",
      nights: 2,
      status: BookingStatus.PENDING,
      total: 1250,
    },
  ];

  const bookingColumns = [
    {
      key: "code",
      title: "Booking ID",
      render: (row: Booking) => (
        <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
          {row.bookingCode}
        </span>
      ),
    },

    {
      key: "guest",
      title: "Guest",
      render: (row: Booking) => (
        <div className="flex items-center gap-3 min-w-[220px]">
          <div
            className="w-9 h-9 rounded-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${row.guest.avatar})` }}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {row.guest.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{row.guest.email}</p>
          </div>
        </div>
      ),
    },

    {
      key: "hotel",
      title: "Hotel / Room",
      render: (row: Booking) => (
        <>
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {row.hotel}
          </p>
          <p className="text-xs text-gray-400 whitespace-nowrap">{row.room}</p>
        </>
      ),
    },

    {
      key: "period",
      title: "Stay Period",
      render: (row: Booking) => (
        <>
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {row.period}
          </p>
          <p className="text-xs text-gray-400">{row.nights} Nights</p>
        </>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (row: Booking) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${
            {
              confirmed: "bg-green-50 text-green-700",
              pending: "bg-amber-50 text-amber-700",
              cancelled: "bg-red-50 text-red-700",
            }[row.status]
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "total",
      title: "Total",
      render: (row: Booking) => (
        <span className="font-semibold text-gray-900 whitespace-nowrap">
          ${row.total.toLocaleString()}
        </span>
      ),
    },

    {
      key: "actions",
      title: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: () => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined text-xl">
              <Eye />
            </span>
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined text-xl"><List /></span>
          </button>
        </div>
      ),
    },
  ];
  return (
    <main className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
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
            1,284
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
            42
          </div>
          <p className="text-xs text-gray-400 mt-4">
            8 urgent requests need attention
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
            $128,400
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Current month vs last month
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white :bg-gray-900 rounded-xl shadow-sm border border-gray-200 :border-gray-800 overflow-hidden">
        {/* Table Header with Tabs and Actions */}
        <div className="p-3 sm:p-4 border-b border-gray-200 :border-gray-800">
          {/* Tabs - Scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 sm:mb-0 scrollbar-hide">
            <div className="flex border-b-2 border-teal-500 px-3 sm:px-4 pb-2 whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-900 :text-white">
                All Bookings
              </span>
            </div>
            <div className="flex px-3 sm:px-4 pb-2 whitespace-nowrap">
              <span className="text-sm font-medium text-gray-400 cursor-pointer hover:text-teal-500 transition-colors">
                Confirmed
              </span>
            </div>
            <div className="flex px-3 sm:px-4 pb-2 whitespace-nowrap">
              <span className="text-sm font-medium text-gray-400 cursor-pointer hover:text-teal-500 transition-colors">
                Pending
              </span>
            </div>
          </div>

          {/* Action Buttons */}
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
          data={fakeBookings}
          loading={false}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          columns={bookingColumns}
        />
        <Pagination
          currentPage={page}
          totalPages={128}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
};

export default BookingList;
