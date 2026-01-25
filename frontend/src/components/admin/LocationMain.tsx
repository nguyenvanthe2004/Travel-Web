import type React from "react";
import { useEffect, useState } from "react";
import { callGetAllLocation } from "../../services/location";
import { Location } from "../../types/location";
import { CLOUDINARY_URL } from "../../constants";

const LocationMain: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await callGetAllLocation();
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);
  console.log(locations);
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Locations
          </h2>
          <p className="text-slate-500 text-sm">
            Manage your property locations and their operational status across
            the globe.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0F8FA0] text-white text-sm font-bold rounded-lg hover:bg-[#0F8FA0]/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Location
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#0F8FA0] transition-colors">
              search
            </span>
          </div>
          <input
            className="block w-full max-w-md pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:outline-none transition-all"
            placeholder="Search locations by name, city, or status..."
            type="text"
          />
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">
                  Preview
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Location Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-40">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-32 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locations.map((location) => (
                <tr
                  key={location._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Preview */}
                  <td className="px-6 py-4">
                    <div
                      className="size-12 rounded-lg bg-cover bg-center border border-slate-200"
                      style={
                        {
                          backgroundImage: `url(${CLOUDINARY_URL}${location.image})`,
                        }
                      }
                    />
                  </td>

                  {/* Location Details */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">
                      {location.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      —{/* chưa có dữ liệu */}
                    </div>
                  </td>

                  {/* Description (chưa có data) */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-400 italic">
                      No description
                    </p>
                  </td>

                  {/* Status (fake UI cho đẹp) */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full uppercase">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/10 rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/10 rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {locations.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400">
                    No locations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing <span className="font-bold text-slate-900">1-4</span> of{" "}
            <span className="font-bold text-slate-900">24</span> locations
          </p>
          <div className="flex items-center gap-1">
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                chevron_left
              </span>
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg bg-[#0F8FA0] text-white text-xs font-bold shadow-sm">
              1
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors">
              2
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors">
              3
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500"></span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              System Operational
            </span>
          </div>
          <div className="text-[11px] text-slate-400 uppercase tracking-widest">
            Last synced: 2 minutes ago
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <a className="hover:text-[#0F8FA0]" href="#">
            API Documentation
          </a>
          <a className="hover:text-[#0F8FA0]" href="#">
            Support
          </a>
          <a className="hover:text-[#0F8FA0]" href="#">
            Legal
          </a>
        </div>
      </div>
    </main>
  );
};

export default LocationMain;
