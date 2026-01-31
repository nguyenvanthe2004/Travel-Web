import React, { ReactNode, useEffect, useState } from "react";
import { CLOUDINARY_URL, UserRole } from "../../constants";

import { callGetAllUser } from "../../services/user";
import { IUser } from "../../types/user";
import { toastError } from "../../lib/toast";
import { Pencil, Trash, User, UserStar } from "lucide-react";
import Pagination from "../ui/Pagination";
import CustomTable from "../ui/CustomTable";

const roleStyle: Record<IUser["role"], string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-200",
  user: "bg-teal-100 text-teal-700 border-teal-200",
};

const roleIcon: Record<IUser["role"], ReactNode> = {
  admin: <UserStar />,
  user: <User />,
};

const UserList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await callGetAllUser(page, 10);
        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error: any) {
        toastError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const userColumns = [
    {
      key: "user",
      title: "User",
      render: (row: IUser) => (
        <div className="flex items-center gap-3 min-w-[240px]">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 flex-shrink-0">
            <img
              src={
                row.avatar ? `${CLOUDINARY_URL}/${row.avatar}` : "/images/avatar.png"
              }
              alt={row.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-[#0f181a] truncate">
              {row.fullName}
            </p>
            <p className="text-xs text-[#538893] truncate">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      title: "Role",
      render: (row: IUser) => (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap ${roleStyle[row.role]}`}
        >
          <span className="material-symbols-outlined text-sm">
            {roleIcon[row.role]}
          </span>
          {row.role}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "Joined",
      hideOnMobile: true,
      render: (row: IUser) => (
        <span className="text-sm text-[#538893] whitespace-nowrap">
          {new Date(row.createdAt).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: () => (
        <div className="flex items-center justify-end gap-2 min-w-[120px]">
          <button className="p-1.5 text-[#538893] hover:text-primary hover:bg-primary/5 rounded">
            <span className="material-symbols-outlined text-[22px]">
              <Pencil />
            </span>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
            <span className="material-symbols-outlined text-[22px]">
              <Trash />
            </span>
          </button>
        </div>
      ),
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
        </div>

        <div className="w-full overflow-x-auto">
          <CustomTable
            data={users}
            loading={loading}
            columns={userColumns}
            className="min-w-[900px] bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#e8f0f2] overflow-hidden"
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
};

export default UserList;
