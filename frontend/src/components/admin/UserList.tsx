import React, { useState } from "react";
import { IUser } from "../../types/user";
import { UserRole } from "../../constants";
import CustomTable from "../CustomTable";
import Pagination from "../Pagination";

const UserMain: React.FC = () => {
  const [page, setPage] = useState(1);
  const fakeUsers: IUser[] = [
    {
      _id: "1",
      name: "James Wilson",
      email: "james.wilson@hotelsaas.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBS-otwwhzbjfvPj-lr5HvVY0LAVYQOJ1PVzJn61w1o_Kk2Vz5LqFGdVBEDeTS-Qq0PM_uwgRIhZczpwe-QyYHXtVnSFV72pT3dKFKcZlI7g_45hVkmwBUTUc8ecm8bdk7kRO8_VZA0enednrspr4iev2UH1hxkXdBnECWnwiSM_iFR6DE1ABGNd9_sMSjI47M4Szj72ZbXeofOthavRYChYWx-ffYhFUYbS14-RIoxO0P4g6L3Nodp6EtG2WijVSMBjx2OTPHE-tI",
      role: UserRole.ADMIN,
      joinedAt: "Oct 24, 2023",
    },
    {
      _id: "2",
      name: "Sarah Chen",
      email: "s.chen@outlook.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDq7WxnsYsjIqFvx1G086WlbgkrIcOabW2ZgKT3segRHQZDxsdUQSBOxtj09qmUSxT0fLE5pXwUQFjVs5qN7YCBAKYkQy2Ou57TV23YCXbC9x80-GIoYQsUO4qoWaPZY67bj7cYuouGKqysghbWP8aCBf2KgNyYdNsAwF2MlV19VG05MEed0n8XOrk4JqJ4ZFLbWpAqbvYvCD-BO_FiNc9YEsgRnkX8-wdJSZ0kfx0xjGFJTO0jt8GUmC7pekZzB2FBXj0DPMbxZaM",
      role: UserRole.USER,
      joinedAt: "Nov 12, 2023",
    },
    {
      _id: "3",
      name: "Michael Ross",
      email: "m.ross@gmail.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCvmcSJlV8r-P-LyhWqoeheQ_lMk-hegYc08tDf_6fVA0y-4gYAwdlwaPpH9ctnFkbzmiG138YoHNeQwrLc9nuZLDjFdsKMXzz1YOm6jVaAJthCmqaKCr7pKkyz1t_y0aj3Jf9utG1XnfKjMlQVm7kOhn_tndyLuf6cSZ9oxzwTd9JUoogw9W_Fx859YMkIvkF1HTe138fDh7ufbQLmz8yeEMTYdO70-GzRNJ4Co-VWEhwcHC38XJgQD22P4hZXJwethJkXG8RMH48",
      role: UserRole.USER,
      joinedAt: "Dec 05, 2023",
    },
  ];
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#f8fbfb] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f181a] tracking-tight">
              User Management
            </h2>
            <p className="text-[#538893] mt-1 text-sm sm:text-base">
              Overview of all system users, access levels and activity status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#e8f0f2] bg-white text-[#0f181a] rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#f8fbfb] transition-colors shadow-sm w-full sm:w-auto justify-center">
              <span className="material-symbols-outlined text-base sm:text-lg">
                file_download
              </span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e8f0f2] text-[#0f181a] rounded-lg cursor-pointer hover:bg-[#dfe9eb] transition-colors">
            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
              All Roles
            </span>
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e8f0f2] text-[#538893] rounded-lg cursor-pointer hover:bg-[#f8fbfb] transition-colors">
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
              Active
            </span>
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e8f0f2] text-[#538893] rounded-lg cursor-pointer hover:bg-[#f8fbfb] transition-colors">
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
              Joined: Last 30 days
            </span>
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </div>
          <div className="w-full sm:w-auto sm:ml-auto text-xs text-[#538893] font-medium text-center sm:text-right">
            Showing <span className="text-[#0f181a] font-bold">124</span> users
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div>
            <CustomTable<IUser>
              data={fakeUsers}
              loading={false}
              className="min-w-[900px] bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#e8f0f2] overflow-hidden"
              columns={[
                // ================= USER =================
                {
                  key: "user",
                  title: "User",
                  render: (row) => (
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 flex-shrink-0">
                        <img
                          src={row.avatar}
                          alt={row.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0f181a] truncate">
                          {row.name}
                        </p>
                        <p className="text-xs text-[#538893] truncate">
                          {row.email}
                        </p>
                      </div>
                    </div>
                  ),
                },

                // ================= ROLE =================
                {
                  key: "role",
                  title: "Role",
                  render: (row) => {
                    const roleStyle: Record<IUser["role"], string> = {
                      admin: "bg-purple-100 text-purple-700 border-purple-200",
                      user: "bg-teal-100 text-teal-700 border-teal-200",
                    };

                    const roleIcon: Record<IUser["role"], string> = {
                      admin: "shield_person",
                      user: "person",
                    };

                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap ${roleStyle[row.role]}`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {roleIcon[row.role]}
                        </span>
                        {row.role}
                      </span>
                    );
                  },
                },

                // ================= JOINED =================
                {
                  key: "joinedAt",
                  title: "Joined",
                  hideOnMobile: true,
                  render: (row) => (
                    <span className="text-sm text-[#538893] whitespace-nowrap">
                      {row.joinedAt}
                    </span>
                  ),
                },

                // ================= ACTIONS =================
                {
                  key: "actions",
                  title: "Actions",
                  headerClassName: "text-right",
                  cellClassName: "text-right",
                  render: (row) => (
                    <div className="flex items-center justify-end gap-2 min-w-[120px]">
                      <button className="p-1.5 text-[#538893] hover:text-primary hover:bg-primary/5 rounded">
                        <span className="material-symbols-outlined text-[22px]">
                          edit
                        </span>
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <span className="material-symbols-outlined text-[22px]">
                          delete
                        </span>
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <Pagination
            currentPage={page}
            totalPages={128}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
};

export default UserMain;
