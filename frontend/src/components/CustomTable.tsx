import type React from "react";
import { CustomTableProps } from "../types/items";

const CustomTable = <T extends { _id: string }>({
  data,
  columns,
  loading = false,
  emptyText = "No data found",
  className = "",
}: CustomTableProps<T>) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`
                    px-6 py-4 text-xs font-bold uppercase text-slate-500
                    text-left align-middle whitespace-nowrap
                    ${col.headerClassName ?? ""}
                  `}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 align-middle"
                    >
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-slate-400"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`
                        px-6 py-4 align-middle whitespace-nowrap
                        ${col.cellClassName ?? ""}
                      `}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
