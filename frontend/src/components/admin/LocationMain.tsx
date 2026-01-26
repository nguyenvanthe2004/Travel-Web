import type React from "react";
import { useEffect, useState } from "react";
import {
  callDeleteLocation,
  callGetAllLocation,
} from "../../services/location";
import { Location } from "../../types/location";
import { CLOUDINARY_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LocationMain: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();
  
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

  const handleDeleteLocation = async (id: string) => {
    try {
      await callDeleteLocation(id);
      setLocations((prev) => prev.filter((location) => location._id !== id));
      toast.success("Location deleted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Locations
            </h2>
            <p className="text-slate-500 text-sm">
              Manage your property locations and their operational status across the globe.
            </p>
          </div>
          <button
            onClick={() => navigate("/locations/create")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F8FA0] text-white text-sm font-bold rounded-lg hover:bg-[#0E7A88] transition-all shadow-sm whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Location
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">
                search
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:border-[#0F8FA0] focus:ring-2 focus:ring-[#0F8FA0]/20 focus:outline-none transition-all"
              placeholder="Search locations..."
              type="text"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
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
                {locations.map((location) => (
                  <tr
                    key={location._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div
                        className="size-14 rounded-lg bg-cover bg-center border border-slate-200"
                        style={{
                          backgroundImage: `url(${CLOUDINARY_URL}${location.image})`,
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-base">
                        {location.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-full uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          className="p-2.5 text-slate-400 hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/10 rounded-lg transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            visibility
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/locations/update/${location._id}`)
                          }
                          className="p-2.5 text-slate-400 hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteLocation(location._id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {locations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-400">
                      No locations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {locations.map((location) => (
              <div key={location._id} className="p-4">
                <div className="flex items-start gap-4">
                  {/* Image */}
                  <div
                    className="size-20 flex-shrink-0 rounded-lg bg-cover bg-center border border-slate-200"
                    style={{
                      backgroundImage: `url(${CLOUDINARY_URL}${location.image})`,
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base mb-2">
                      {location.name}
                    </h3>
                    <span className="inline-flex items-center text-[10px] font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-full uppercase">
                      Active
                    </span>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                        View
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/locations/update/${location._id}`)
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[#0F8FA0] bg-[#0F8FA0]/10 hover:bg-[#0F8FA0]/20 rounded-lg text-xs font-medium transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(location._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {locations.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                No locations found
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          {locations.length > 0 && (
            <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 order-2 sm:order-1">
                Showing <span className="font-bold text-slate-900">1-4</span> of{" "}
                <span className="font-bold text-slate-900">24</span> locations
              </p>
              <div className="flex items-center gap-1 order-1 sm:order-2">
                <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:border-slate-300 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-[#0F8FA0] text-white text-sm font-bold shadow-sm">
                  1
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                  2
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                  3
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:border-slate-300 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-500"></span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                System Operational
              </span>
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Last synced: 2 minutes ago
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <a className="hover:text-[#0F8FA0] transition-colors" href="#">
              API Documentation
            </a>
            <a className="hover:text-[#0F8FA0] transition-colors" href="#">
              Support
            </a>
            <a className="hover:text-[#0F8FA0] transition-colors" href="#">
              Legal
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LocationMain;