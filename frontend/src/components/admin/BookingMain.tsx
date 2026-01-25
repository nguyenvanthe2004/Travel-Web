import React from "react";

const BookingMain: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 :text-white tracking-tight">
          Bookings Management
        </h1>
        <p className="text-gray-500 :text-gray-400 mt-1">
          Real-time overview and control of all guest reservations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 :border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Bookings
            </span>
            <span className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded">
              +12.5%
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 :text-white">
            1,284
          </div>
          <div className="mt-4 h-1.5 w-full bg-gray-100 :bg-gray-800 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-[70%]"></div>
          </div>
        </div>
        <div className="bg-white :bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 :border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Pending Approvals
            </span>
            <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-2 py-1 rounded">
              High Alert
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 :text-white">
            42
          </div>
          <p className="text-xs text-gray-400 mt-4">
            8 urgent requests need attention
          </p>
        </div>
        <div className="bg-white :bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 :border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <span className="text-red-500 text-xs font-semibold">-2.1%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 :text-white">
            $128,400
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Current month vs last month
          </p>
        </div>
      </div>
      <div className="bg-white :bg-gray-900 rounded-xl shadow-sm border border-gray-200 :border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-200 :border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex border-b-2 border-teal-500 px-4 pb-2">
              <span className="text-sm font-semibold text-gray-900 :text-white">
                All Bookings
              </span>
            </div>
            <div className="flex px-4 pb-2">
              <span className="text-sm font-medium text-gray-400 cursor-pointer hover:text-teal-500 transition-colors">
                Confirmed
              </span>
            </div>
            <div className="flex px-4 pb-2">
              <span className="text-sm font-medium text-gray-400 cursor-pointer hover:text-teal-500 transition-colors">
                Pending
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 :border-gray-700 rounded-lg text-sm font-medium text-gray-600 :text-gray-300 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-lg">tune</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 :border-gray-700 rounded-lg text-sm font-medium text-gray-600 :text-gray-300 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 :bg-gray-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Hotel / Room
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Stay Period
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 :divide-gray-800">
              <tr className="hover:bg-gray-50 :hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-5 text-sm font-semibold text-gray-900 :text-white">
                  #BK-9821
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-cover bg-center"
                      data-alt="Guest profile picture of Sarah Johnson"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuGgi3dqmjdM5l11SF4LvI3bPtGo7wsKY41_1OT8VpkwdUDOMnfOLGGeQPP3sy_o5edE4p40UPErVlriAqeQibqerPN1A9yvAr8mY2daQHw7F_ALijmPoS_YFeo4OnKsgHMCjayQNb7NxG0pzYSrXoVLeijIAEY7y2djFx6krL5th2l2Kw4f2WRqllNLo2F7IX6SRkjh-y9aKCo9cemPnoqr_qsVikEDxo_6dtUk2R0t78VNUYynCRCXk-BBlq5ldZDKnWi67Gl9g')" }}
                    ></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 :text-white">
                        Sarah Johnson
                      </p>
                      <p className="text-xs text-gray-400">sarah.j@email.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Grand Azure Resort
                  </p>
                  <p className="text-xs text-gray-400">
                    Deluxe Sea View, Rm 402
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Oct 12 - Oct 15
                  </p>
                  <p className="text-xs text-gray-400">3 Nights</p>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-700 :bg-green-900/30 :text-green-400">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-5 font-semibold text-gray-900 :text-white">
                  $840.00
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        more_vert
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 :hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-5 text-sm font-semibold text-gray-900 :text-white">
                  #BK-9819
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-cover bg-center"
                      data-alt="Guest profile picture of Michael Chen"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtIZbQKsYS7TZbu16Jf13LcFh37papXW4-ie30nzebSkMp7AGbJlTVat-1UaiAO9fhBEmDw8wNF3USZ7JLfi1y5IQWbi094RHUzy_OmumQaldP95Ijb0ulFMAT7GCuqFr_R-9zUqJaVWrRDb1DG_ZidUPDKN3PPlO5NU7h30byo-JKm4eY44KkYj3AIc1-k_ipjbzVoalxx3qq8_fPXlTOhkyempbx1CALo5DO9tl9iuaOm1kFjrRTKKKhz1ziWxheNoIDw-mfL8Q')" }}
                    ></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 :text-white">
                        Michael Chen
                      </p>
                      <p className="text-xs text-gray-400">
                        m.chen@outlook.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    City Palace Hotel
                  </p>
                  <p className="text-xs text-gray-400">
                    Business Suite, Rm 1012
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Oct 14 - Oct 16
                  </p>
                  <p className="text-xs text-gray-400">2 Nights</p>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 :bg-amber-900/30 :text-amber-400">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-5 font-semibold text-gray-900 :text-white">
                  $1,250.00
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        more_vert
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 :hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-5 text-sm font-semibold text-gray-900 :text-white">
                  #BK-9815
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-cover bg-center"
                      data-alt="Guest profile picture of Robert Fox"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxJYlwZlocFpFG5hXtT6rHMxrqwxFKSVrXjmA5g55t_dp4ChiEI-lPf1VUgFoKYJ4aa12avKUlPkxblxGVf86lBdDG7wgvT22t3x3ymNefxP6MQVfzUMP0Z5LrSoHwBZEokEpzakSRvQLomeL54hwv9WfD_SX8lb0CZjKtcdsU2HmCTJN_MUaRSN2Zib3JkNLhoqc_tgbCZbp81BQPXC4crlo9VJyISXLyK1uNP5dDf5TNYmF3gBUXJZv7-9g7Iqs45BFPkDBPkSo')" }}
                    ></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 :text-white">
                        Robert Fox
                      </p>
                      <p className="text-xs text-gray-400">r.fox@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Mountain Peak Lodge
                  </p>
                  <p className="text-xs text-gray-400">Family Cabin, C-4</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Oct 20 - Oct 27
                  </p>
                  <p className="text-xs text-gray-400">7 Nights</p>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-700 :bg-red-900/30 :text-red-400">
                    Cancelled
                  </span>
                </td>
                <td className="px-6 py-5 font-semibold text-gray-900 :text-white">
                  $3,420.00
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        more_vert
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 :hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-5 text-sm font-semibold text-gray-900 :text-white">
                  #BK-9812
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-cover bg-center"
                      data-alt="Guest profile picture of Emily Blunt"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzCXq3DVgo1TP-fUebb-vC9hPNlRG3tEMUuWGlbrrbnJA01QSS-YLCdoe6Fprujwl_oQntBrDsB7ioQ2r-tKFTqcpCpo2cUD8dwEGqeHJhHDIWCFjGctzJooru6OYBPVqpq1vhb4RjuPm_2zQU-my8g8ZIGoArJQUNwzTqigZZlD0Z42p-1c3Qyj5-sr-jt4slnbuQ8q1VWkVGeo_VfUrNyTCcOtL4uufMiRq3CtMsWuH24SoAfmBvWnYBT9SJArB_HwNGVThQW2k')" }}
                    ></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 :text-white">
                        Emily Blunt
                      </p>
                      <p className="text-xs text-gray-400">emily.b@work.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Oceania Grand
                  </p>
                  <p className="text-xs text-gray-400">Presidential, Rm 88</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-700 :text-gray-300">
                    Nov 01 - Nov 05
                  </p>
                  <p className="text-xs text-gray-400">4 Nights</p>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-700 :bg-green-900/30 :text-green-400">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-5 font-semibold text-gray-900 :text-white">
                  $5,600.00
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">
                        more_vert
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 :border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">
            Showing{" "}
            <span className="font-semibold text-gray-900 :text-white">
              1 to 10
            </span>{" "}
            of 1,284 bookings
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 :border-gray-700 text-gray-400 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-9 h-9 rounded-lg bg-teal-500 text-white font-semibold text-sm">
              1
            </button>
            <button className="w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-50 font-semibold text-sm transition-colors">
              2
            </button>
            <button className="w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-50 font-semibold text-sm transition-colors">
              3
            </button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-50 font-semibold text-sm transition-colors">
              128
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 :border-gray-700 text-gray-400 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingMain;