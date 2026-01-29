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
import { CLOUDINARY_URL } from "../../constants";
import Pagination from "../Pagination";

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await callGetAllLocation(page, 10);
        setLocations(res.data.data);
        setTotalPages(res.data.totalPages)
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleDeleteLocation = async (id: string) => {
    if (deleting) return;
    try {
      setDeleting(id);
      await callDeleteLocation(id);
      setLocations((prev) => prev.filter((l) => l._id !== id));
      toast.success("Location deleted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  const columns = [
    {
      key: "image",
      title: "Preview",
      render: (row: Location) => (
        <div
          className="size-14 rounded-lg bg-cover bg-center border border-slate-200"
          style={{
            backgroundImage: `url(${CLOUDINARY_URL}${row.image})`,
          }}
        />
      ),
    },
    {
      key: "name",
      title: "Location",
      render: (row: Location) => (
        <span className="font-bold text-slate-900">{row.name}</span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row: Location) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => navigate(`/locations/update/${row._id}`)}
            className="p-2.5 text-slate-400 hover:text-[#0F8FA0] hover:bg-[#0F8FA0]/10 rounded-lg"
          >
            <span className="material-symbols-outlined text-[22px]">edit</span>
          </button>

          <button
            disabled={deleting === row._id}
            onClick={() => handleDeleteLocation(row._id)}
            className={`p-2.5 rounded-lg transition ${
              deleting === row._id
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-400 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {deleting === row._id ? "hourglass_top" : "delete"}
            </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-8 pb-4 sm:pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Locations
            </h2>
            <p className="text-slate-500 text-sm">
              Manage your property locations and their operational status.
            </p>
          </div>
          <button
            onClick={() => navigate("/locations/create")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F8FA0] text-white text-sm font-bold rounded-lg hover:bg-[#0E7A88]"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Location
          </button>
        </div>
        <CustomTable
          data={locations}
          loading={loading}
          columns={columns}
        />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </main>
  );
};

export default LocationList;
