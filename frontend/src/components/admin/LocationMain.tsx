import type React from "react";
import { useEffect, useState } from "react";
import {
  callDeleteLocation,
  callGetAllLocation,
} from "../../services/location";
import { Location } from "../../types/location";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomTable from "../CustomTable";
import { set } from "zod";
import { fa } from "zod/v4/locales";

const LocationMain: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const res = await callGetAllLocation();
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
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
  const handleEditLocation = (id: string) => {
    navigate(`/locations/update/${id}`);
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
              Manage your property locations and their operational status across
              the globe.
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

        {/* Table */}
        <CustomTable
          data={locations}
          onEdit={handleEditLocation}
          onDelete={handleDeleteLocation}
          loading={loading}
        />

        {/* Pagination Footer */}
        {locations.length > 0 && (
          <div className="mt-4 px-4 sm:px-6 py-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
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
