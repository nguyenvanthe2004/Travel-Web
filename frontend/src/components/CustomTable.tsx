import type React from "react";
import { CLOUDINARY_URL } from "../constants";

const CustomTable: React.FC<{
  data: { _id: string; name: string; image: string }[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}> = ({ data, onEdit, onDelete, loading = false }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Location Details
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="size-14 rounded-lg bg-slate-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-5 bg-slate-200 rounded w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-7 bg-slate-200 rounded-full w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <div className="size-9 bg-slate-200 rounded-lg" />
                      <div className="size-9 bg-slate-200 rounded-lg" />
                      <div className="size-9 bg-slate-200 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">
                  No locations found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div
                      className="size-14 rounded-lg bg-cover bg-center border border-slate-200"
                      style={{
                        backgroundImage: `url(${CLOUDINARY_URL}${item.image})`,
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-base">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-full uppercase">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item._id)}
                          className="p-2.5 text-slate-400 hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            edit
                          </span>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item._id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="size-20 rounded-lg bg-slate-200 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-6 bg-slate-200 rounded-full w-16" />
                  <div className="flex gap-2">
                    <div className="flex-1 h-9 bg-slate-200 rounded-lg" />
                    <div className="flex-1 h-9 bg-slate-200 rounded-lg" />
                    <div className="size-9 bg-slate-200 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : data.length === 0 ? (
          // Empty state
          <div className="p-12 text-center text-slate-400">
            No locations found
          </div>
        ) : (
          // Data cards
          data.map((item) => (
            <div key={item._id} className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className="size-20 flex-shrink-0 rounded-lg bg-cover bg-center border border-slate-200"
                  style={{
                    backgroundImage: `url(${CLOUDINARY_URL}${item.image})`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {item.name}
                  </h3>
                  <span className="inline-flex items-center text-[10px] font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-full uppercase">
                    Active
                  </span>
                  <div className="flex items-center gap-2 mt-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[#0F8FA0] bg-[#0F8FA0]/10 hover:bg-[#0F8FA0]/20 rounded-lg text-xs font-medium transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomTable;
