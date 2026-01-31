import { Banknote, Hotel, Notebook, UserRound } from "lucide-react";
import type React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-20 lg:pt-8 space-y-6 sm:space-y-8">
        {/* Header & Stats Cards */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 tracking-tight">
            Overview Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Bookings */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    <Notebook />
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                Total Bookings
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">1,284</h3>
            </div>

            {/* Active Hotels */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-[#0F8FA0]/10 text-[#0F8FA0] rounded-lg">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    <Hotel />
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                  Static
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                Active Hotels
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">45</h3>
            </div>

            {/* Total Users */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    <UserRound />
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +2.1%
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                Total Users
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">8,902</h3>
            </div>

            {/* Revenue */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    <Banknote />
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +5.4%
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                Revenue
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">$124,500</h3>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Bookings Over Time
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                  Analysis for the current month vs last month
                </p>
              </div>
              <select className="text-xs sm:text-sm border border-slate-200 bg-white rounded-lg focus:ring-[#0F8FA0] focus:border-[#0F8FA0] py-1.5 px-3 outline-none">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-48 sm:h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor="rgba(15, 143, 160, 0.2)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgba(15, 143, 160, 0)"
                      stopOpacity={1}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M0,150 C100,120 150,180 250,100 C350,20 450,140 550,80 C650,20 750,60 800,40 V200 H0 Z"
                  fill="url(#gradient)"
                />
                <path
                  d="M0,150 C100,120 150,180 250,100 C350,20 450,140 550,80 C650,20 750,60 800,40"
                  fill="none"
                  stroke="#0F8FA0"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <circle
                  cx="250"
                  cy="100"
                  fill="#0F8FA0"
                  r="4"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="550"
                  cy="80"
                  fill="#0F8FA0"
                  r="4"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              <div className="flex justify-between mt-3 sm:mt-4 px-2 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Week 01</span>
                <span>Week 02</span>
                <span>Week 03</span>
                <span>Week 04</span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold mb-6 sm:mb-8">
              Booking Status
            </h3>
            <div className="relative flex justify-center items-center h-40 sm:h-48">
              <svg className="w-32 h-32 sm:w-40 sm:h-40 rotate-[-90deg]" viewBox="0 0 36 36">
                <circle
                  className="stroke-slate-100"
                  cx="18"
                  cy="18"
                  fill="none"
                  r="16"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  fill="none"
                  r="16"
                  stroke="#0F8FA0"
                  strokeDasharray="70 100"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  fill="none"
                  r="16"
                  stroke="#94a3b8"
                  strokeDasharray="20 100"
                  strokeDashoffset="-70"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  fill="none"
                  r="16"
                  stroke="#FF6C4C"
                  strokeDasharray="10 100"
                  strokeDashoffset="-90"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-extrabold">1.2k</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">
                  Total
                </span>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#0F8FA0]" />
                  <span className="text-xs font-semibold text-slate-600">
                    Confirmed
                  </span>
                </div>
                <span className="text-xs font-bold">70%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-slate-400" />
                  <span className="text-xs font-semibold text-slate-600">
                    Pending
                  </span>
                </div>
                <span className="text-xs font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#FF6C4C]" />
                  <span className="text-xs font-semibold text-slate-600">
                    Cancelled
                  </span>
                </div>
                <span className="text-xs font-bold">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold">Recent Bookings</h3>
            <button className="text-xs sm:text-sm font-bold text-[#0F8FA0] hover:underline text-left sm:text-right">
              View All Bookings
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  <th className="px-6 py-4">Guest Name</th>
                  <th className="px-6 py-4">Hotel Property</th>
                  <th className="px-6 py-4">Check-in</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                        JD
                      </div>
                      <span className="text-sm font-semibold">Jane Doe</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      Grand Azure Resort
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">Oct 24, 2023</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$1,250.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#0F8FA0]/10 text-[#0F8FA0]">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                      <span className="material-symbols-outlined text-xl text-slate-400">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                        MS
                      </div>
                      <span className="text-sm font-semibold">Marcus Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      Lakeside Inn &amp; Spa
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">Oct 25, 2023</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$420.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                      <span className="material-symbols-outlined text-xl text-slate-400">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                        LK
                      </div>
                      <span className="text-sm font-semibold">Lana Kane</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      Urban Boutique Hotel
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">Oct 22, 2023</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$890.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-red-50 text-red-500">
                      Cancelled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                      <span className="material-symbols-outlined text-xl text-slate-400">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                        BT
                      </div>
                      <span className="text-sm font-semibold">Ben Tally</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      Highland Peak Cabin
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">Oct 28, 2023</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$1,560.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#0F8FA0]/10 text-[#0F8FA0]">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                      <span className="material-symbols-outlined text-xl text-slate-400">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs flex-shrink-0">
                    JD
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">Jane Doe</p>
                    <p className="text-xs text-slate-500 truncate">
                      Grand Azure Resort
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Oct 24, 2023</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded ml-2">
                  <span className="material-symbols-outlined text-lg text-slate-400">
                    more_vert
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold">$1,250.00</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#0F8FA0]/10 text-[#0F8FA0]">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs flex-shrink-0">
                    MS
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">Marcus Smith</p>
                    <p className="text-xs text-slate-500 truncate">
                      Lakeside Inn & Spa
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Oct 25, 2023</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded ml-2">
                  <span className="material-symbols-outlined text-lg text-slate-400">
                    more_vert
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold">$420.00</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500">
                  Pending
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs flex-shrink-0">
                    LK
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">Lana Kane</p>
                    <p className="text-xs text-slate-500 truncate">
                      Urban Boutique Hotel
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Oct 22, 2023</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded ml-2">
                  <span className="material-symbols-outlined text-lg text-slate-400">
                    more_vert
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold">$890.00</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-50 text-red-500">
                  Cancelled
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs flex-shrink-0">
                    BT
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">Ben Tally</p>
                    <p className="text-xs text-slate-500 truncate">
                      Highland Peak Cabin
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Oct 28, 2023</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded ml-2">
                  <span className="material-symbols-outlined text-lg text-slate-400">
                    more_vert
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold">$1,560.00</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#0F8FA0]/10 text-[#0F8FA0]">
                  Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;